const express = require('express');
const app = express();
const port = process.env.PORT || 8080
const router = require("./routes.js")
var pool = require('./databaseConnection')
const fs = require('fs')

const sqlCommands = fs.readFileSync('./database.sql').toString();

const createTables = async () => {
   try {
    await pool.query(sqlCommands);
    console.log("Tables successfully created")
} catch (err) {
    console.error("Table creation failed:", err);
}
}

createTables();

app.use(express.static('./public'))
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})