const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        //your MySQL ussername,
        user: 'root',
        //your MySQL password
        password: 'leman5366',
        database: 'election'
    },
    console.log('Connected to the election database')
);

module.exports = db;