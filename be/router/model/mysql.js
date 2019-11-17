//todo install mysql 依赖
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'weChat'
});

connection.connect();

module.exports = connection;