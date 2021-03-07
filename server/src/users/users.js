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

async function waitForCatDb() {
    if (!catDb) {
        catDb = await database.connect(databaseConfig);
    }
}

async function getAllUsers() {

    await waitForCatDb();

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

async function findUser (userId) {

    var users = await getAllUsers();

    return users.find(user => user.id === userId);
}

exports.findUser = findUser

exports.userLogin = async function (username, password) {

    var users = await getAllUsers();

    const user = users.find(user => user.username === username);

    if (user && passwordHash.verify(password, user.password)) {
        return user;
    }

}

exports.createUser = async function (username, password) {

    await waitForCatDb();

    var users = await getAllUsers();

    const user = users.find(user => user.username === username);

    if (user) {
        return false;
    }

    const id = Math.floor(Math.random() * Math.pow(10, 10));
    const hashedPwd = passwordHash.generate(password);

    try {

        await new Promise(function (resolve, reject) {
            catDb.query(`INSERT INTO users (id, username, password, roles) VALUES (${id},'${username}','${hashedPwd}','user');`, function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });

        return true;

    }

    catch (error) {
        
        console.error('Error creating user:', error);
        return false;

    }

}

exports.updateUser = async function (user, oldPassword, newPassword) {

    await waitForCatDb();

    // Get the user record with the password
    var user = await findUser(user.id);

    if (!passwordHash.verify(oldPassword, user.password)) {
        return false;
    }

    const hashedPwd = passwordHash.generate(newPassword);

    try {

        await new Promise(function (resolve, reject) {
            catDb.query(`UPDATE users SET password='${hashedPwd}' WHERE id=${user.id};`, function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });

        return true;

    }

    catch (error) {
        
        console.error('Error updating user:', error);
        return false;

    }

}