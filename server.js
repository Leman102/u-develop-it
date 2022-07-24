const express = require('express');
//import mysql2 package
//const mysql = require('mysql2');//MOVE to connection file import db module
const db = require('./db/connection');
//import inputCheck module (function)
const inputCheck = require('./utils/inputCheck');

//Add API routes
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use apiRoutes
app.use('/api', apiRoutes);

//get test route
// app.get('/', (req,res) => {
//     res.json({
//         message: 'Hello World!'
//     });
// });

//MOVE to connections file
//connect to database
/*
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
*/

//query the database to test the connection get all candidates
// db.query('SELECT * FROM candidates', (err, rows) => {
//     console.log(rows);
// });


/*
Transfer to candidateRoutes
//GET all Candidates
//api in the URL signifies that this is an API endpoint.
app.get('/api/candidates', (req,res) => {
    const sql = `SELECT candidates.*, parties.name 
                    AS party_name 
                    FROM candidates 
                    LEFT JOIN parties 
                    ON candidates.party_id = parties.id`;

    db.query(sql, (err,rows) => {
        if(err){
            //error response
            res.status(500).json({error: err.message});//Indicates a user request error.
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


// Test a single candidate
// db.query(`SELECT * FROM candidates WHERE id =1`, (err, row) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(row);
// });

// GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name 
                    AS party_name 
                    FROM candidates 
                    LEFT JOIN parties 
                    ON candidates.party_id = parties.id 
                    WHERE candidates.id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
});

//Delete a canddiate (the question mark (?) denotes a placeholder)
//after the ?, we define the target value
// db.query(`DELETE FROM candidates WHERE id = ?`,1, (err,result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// DELETE candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
});

//create a candidate
// const sql = `INSERT INTO candidates (id, first_name,last_name,industry_connected)
//                 VALUES (?,?,?,?)`;
// const params = [1,'Ronald','Firbank',1];

// db.query(sql,params,(err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

//POST a candidate
app.post('/api/candidate', ({body}, res) => {
    //object destructuring to pull the body property out of the request object
    const errors = inputCheck(body, 'first_name','last_name','industry_connected');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
                    VALUES(?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql,params, (err, result) => {
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//PUT Update a candidate's party
app.put('/api/candidate/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');
    if (errors) {
        res.status(400).json({ error: errors });
        return;
    }

    const sql = `UPDATE candidates SET party_id = ? 
                 WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
});
Close the comment candidates
*/

//Party API transferred to partyRoutes file

//create catchall route to Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});


// app.listen(PORT, () => {
//     console.log(`Server running on  ${PORT}`);
// });

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
});