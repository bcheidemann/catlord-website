var jwt = require('./jwt')
var users = require('../users/users');
var { sanitiseUser } = require('../helpers/sanitise');

exports.jwtAuthenticationMiddleware = async (req, res, next) => {
    const token = req.header('Access-Token');
    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.decodeToken(token);
        const { userId } = decoded;

        var user = await users.findUser(userId);

        if (user) {
            req.user = sanitiseUser(user);
        }
    } catch (e) {
        return next();
    }

    next();
};

// This middleware stops the request if a user is not authenticated.
exports.isAuthenticatedMiddleware = (req, res, next) => {
    if (req.user) {
        return next();
    }

    res.status(401);
    res.json({ error: 'User not authenticated' });
}