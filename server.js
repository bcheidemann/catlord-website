const dotenv = require('dotenv')
const path = require('path');

const { error } = dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

if (error) {
    throw error;
}

const express = require('express');
const aws = require('aws-sdk');
const rateLimit = require("express-rate-limit");
var bodyParser = require('body-parser')
var { jwtAuthenticationMiddleware, isAuthenticatedMiddleware } = require('./server/src/middleware/middleware');
var users = require('./server/src/users/users');
var jwt = require('./server/src/middleware/jwt');

const app = express();

var jsonParser = bodyParser.json();

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com');

const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
});

// Serve static files in the build directory. If no file exists then we serve index.html which will handle client side routing.
app.use(express.static(path.join(__dirname, 'build')));

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

const rateLimiter = rateLimit({
    windowMs: parseInt(process.env.BUCKET_RATE_LIMIT_PERIOD_MINS) * 60 * 1000,
    max: parseInt(process.env.BUCKET_RATE_LIMIT_MAX_REQ),
    handler: function (req, res) {
        res.redirect('/429');
    }
});

// only apply rate limiting to requests that begin with /files/
app.use("/files/", rateLimiter);


app.get('/files/*', jwtAuthenticationMiddleware, function (req, res) {

    if (!req.user) {
        return res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }

    var Key = req.url.replace('/files/', '');

    var params = {
        Bucket: process.env.BUCKET,
        Key,
    };

    var signedUrl = s3.getSignedUrl('getObject', params);

    res.send({ signedUrl });

    return;
});

app.post('/login', jsonParser, async function (req, res) {
    let { username, password } = req.body;

    const user = await users.userLogin(username, password);

    if (!user) {
        res.status(401);
        return res.json({ error: 'Invalid username or password' });
    }

    const accessToken = jwt.encodeToken({ userId: user.id });
    return res.json({ accessToken });
});

app.post('/createuser', jsonParser, jwtAuthenticationMiddleware, async function (req, res) {

    if (!req.user || req.user.roles !== 'admin') {
        return res.sendStatus(401);
    }

    let { username, password } = req.body;

    if (!username || !password) {
        return res.sendStatus(400);
    }

    const created = await users.createUser(username, password);

    res.json({created});
});

app.get('/me', jwtAuthenticationMiddleware, isAuthenticatedMiddleware, function (req, res) {
    res.json({
        user: req.user,
    });
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log('Starting server...');

app.listen(9000);

console.log('Running.');
