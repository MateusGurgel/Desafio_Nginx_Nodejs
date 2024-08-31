const express = require("express");
const mysql = require("mysql2/promise"); // Use the promise-based API

const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: "database",
    database: "database",
    user: "root",
    password: "root"
});

async function createPerson() {
    try {
        const connection = await pool.getConnection();
        const query = 'INSERT INTO people (name) VALUES (?)';
        const values = ['Mateus'];
        await connection.query(query, values);
        connection.release();
    } catch (err) {
        console.error('Error creating person:', err);
        throw err;
    }
}

async function getAllPersons() {
    try {
        const connection = await pool.getConnection();
        const query = 'SELECT * FROM people';
        const [rows] = await connection.query(query);
        connection.release();
        return rows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

app.get("/", async (req, res) => {
    await createPerson();
    const people = await getAllPersons();
    
    const peopleList = people.map(person => person.name).join('-');

    res.send(`<h1>Full Cycle Rocks! ${peopleList}</h1>`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
