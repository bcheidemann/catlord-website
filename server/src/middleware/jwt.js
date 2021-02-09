var njwt = require('njwt');

exports.encodeToken = function (tokenData) {
    return njwt.create(tokenData, process.env.APP_SECRET).compact();
}

exports.decodeToken = function (token) {
    return njwt.verify(token, process.env.APP_SECRET).body;
}