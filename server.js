const express = require('express');
//import mysql2 package
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//get test route
// app.get('/', (req,res) => {
//     res.json({
//         message: 'Hello World!'
//     });
// });

//connect to database
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

//query the database to test the connection
db.query('SELECT * FROM candidates', (err, rows) => {
    console.log(rows);
});

//create catchall route to Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on  ${PORT}`);
});