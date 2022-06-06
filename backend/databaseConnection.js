let mysql = require('mysql2/promise')
const path = require('path'); 
require('dotenv').config({ path:
     path.join(__dirname, '.env') });

//Creating connection pool
let pool = mysql.createPool({
    connectionLimit: process.env.LIMIT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
})

module.exports = pool