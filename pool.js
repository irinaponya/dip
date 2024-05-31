const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "!IPonya_@29!!!!",
    database: "dipp"
}).promise();

module.exports = pool;