const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        //your MySQL ussername,
        user: 'root',
        //your MySQL password
        password: 'password',
        database: 'election'
    },
    console.log('Connected to the election database')
);

module.exports = db;
