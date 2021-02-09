const dotenv = require('dotenv')
const path = require('path');

const { error } = dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

if (error) {
    throw error;
}

const express = require('express');
const fs = require('fs')
const aws = require('aws-sdk');
const rateLimit = require("express-rate-limit");
var bodyParser = require('body-parser')
var { jwtAuthenticationMiddleware, isAuthenticatedMiddleware } = require('./server/src/middleware/middleware');
var users = require('./server/src/users/users');
var jwt = require('./server/src/middleware/jwt');

const app = express();

var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });


// const multer = require('multer');
// const multerS3 = require('multer-s3');


// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com');

const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
});


// var getParams = {
//     Bucket: 'catlord', // your bucket name,
//     Key: '/mods/catcrafting/CatCrafting-0.0.1-mc1.16.3.jar' // path to the object you're looking for
// }

// s3.getObject(getParams, function (err, data) {
//     // Handle any error and exit
//     if (err)
//         console.error(err);
//     return err;

//     // No error happened
//     // Convert Body from a Buffer to a String

//     let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
//     console.log(objectData.length);
// });

// Change bucket property to your Space name
// const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'your-space-here',
//       acl: 'public-read',
//       key: function (request, file, cb) {
//         console.log(file);
//         cb(null, file.originalname);
//       }
//     })
//   }).array('upload', 1);

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

// only apply to requests that begin with /api/
app.use("/files/", rateLimiter);


// http://localhost:9000/files/mods/catcrafting/CatCrafting-0.0.1-mc1.16.3.jar
app.get('/files/*', jwtAuthenticationMiddleware, function (req, res) {

    if (!req.user) {
        return res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }

    var Key = req.url.replace('/files/', '');

    var params = {
        Bucket: process.env.BUCKET,
        Key,
    };

    s3.getObject(params, function (err, data) {
        if (err) {
            console.error(err);
            res.redirect('/404');
        }
        else {
            res.setHeader('Content-Length', data.ContentLength);
            res.setHeader('Content-Type', data.ContentType);
            res.send(data.Body);
        }
    }).on('httpDownloadProgress', (progress, response) => {
        // console.log(`${Math.floor(parseInt(progress.loaded) * 100 / parseInt(progress.total))}%`);
    });

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
