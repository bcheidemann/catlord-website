const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'build')));

app.get('/files/*', function (req, res) {
    var filePath = path.join(__dirname, req.url);
    fs.access(filePath, fs.F_OK, (err) => {
        if (err) {
            res.redirect('/404');
            return;
        }
        res.sendFile(filePath);
    });
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log('Starting server...');

app.listen(9000);
