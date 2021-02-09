var passwordHash = require('password-hash');
var database = require('../database/database');

var databaseConfig = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
}

var catDb;

// const users = [{
//     id: '1',
//     username: 'rohedin4',
//     password: 'sha1$a2f54e6d$1$d38eef56a4d49568533427fe1a4c79295ee306fc', // 'password'
// }, {
//     id: '2',
//     username: 'second.user@gmail.com',
//     password: 'sha1$a2f54e6d$1$d38eef56a4d49568533427fe1a4c79295ee306fc', // 'password'
// }];

async function getAllUsers() {
    
    if (!catDb) {
        catDb = await database.connect(databaseConfig);
    }

    var users = await new Promise(function (resolve, reject) {
        catDb.query("SELECT * FROM users", function (err, result, fields) {
            if (err) {
                reject(err);
            };
            resolve(result);
        });
    });

    return users;
}

exports.getAllUsers = getAllUsers;

exports.findUser = async function (userId) {

    var users = await getAllUsers();

    return users.find(user => user.id === userId);
}

exports.userLogin = async function (username, password) {

    var users = await getAllUsers();

    const user = users.find(user => user.username === username);

    if (user && passwordHash.verify(password, user.password)) {
        return user;
    }

}