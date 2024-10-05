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
