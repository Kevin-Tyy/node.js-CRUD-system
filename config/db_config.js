const mysql = require('mysql');
const dotenv = require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

connection.connect((err) => {
    if (err) {
        throw err.message;
    }else{    
        console.log('Database connection established');
    }
});

module.exports = connection;