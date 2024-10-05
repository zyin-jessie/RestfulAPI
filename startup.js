import express from 'express'; // npm install express
import mysql from 'mysql'; // npm install msql

const app = express();
const port = 4085;

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signupdb",
})

db.connect((error) => {
    if (error) throw error;
    console.log('Connected to the database');
});

const mockUsers = [
    {username: "Jessie", password: "jessie123"},
    {username: "john", password: 'john123'},
    {username: "erika", password: "erika123"}
];

app.listen(port, () => {
    console.log(`running on port http://localhost:${port}`);
})

app.get("/users", (request, response) => {
    const query = "SELECT id, fname, lname FROM registered";

    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query failed: ', err);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
        return response.json(results); 
    });
});
