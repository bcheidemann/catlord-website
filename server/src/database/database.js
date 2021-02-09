var mysql = require('mysql');

exports.connect = async function (config) {

    var con = mysql.createConnection(config);

    const connection = new Promise(function (resolve, reject) {
        con.connect(function (err) {
            if (err) {
                reject(err);
            };
            console.log('Connected to database.');
            resolve(con);
        });
    });

    return await connection;

}