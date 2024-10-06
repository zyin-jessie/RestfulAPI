const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
const port = 4345;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
      secret: "secret", // Change this to a secure secret
      resave: false,
      saveUninitialized: false,
      name: 'HomeCookie',
      cookie: {
        secure: false, // Change to true if using HTTPS
        maxAge: 3600000, // Session expiration time in milliseconds (1 hour in this case)
      },
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signupdb",
})

app.get('/home', (req, res) => {
    if(req.session.fname) {
        return res.json({valid: true, fname: req.session.fname, email: req.session.email, lname: req.session.lname});
    }else {
        return res.json({valid: false});
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        return res.json("Logout failed");
      }
      res.clearCookie('HomeCookie');
      return res.json("Logout Successfully");
    });
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM registered";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    });
})
app.get("/:id", (req, res) => {
    const id = req.params.id; // Get the dynamic parameter from the URL
    const sql = "SELECT * FROM registered WHERE id = ?"; // Adjust the SQL query to use a WHERE clause

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ error: "Error querying the database." });
        if (data.length === 0) return res.status(404).json({ message: "No record found." });
        return res.json(data);
    });
});

app.listen(port, () => {
    console.log("Connected Successfuly.");
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM registered WHERE email = ? AND password = ?";

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) return res.json("Error");
        if(data.length > 0) {
            const user = data[0];
            req.session.fname = user.fname;
            req.session.lname = user.lname;
            req.session.email = user.email;
            console.log(req.session.fname);
            return res.json("Login Successfully");
        }else {
            return res.json("No record Found")
        }
    });
}) 

app.delete("/:id", (req, res) => {
    const sql = "DELETE FROM registered WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO registered (`fname`, `lname`, `email`, `password`, `confirm`, `access`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.pwd,
        req.body.cpwd,
        req.body.access,
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Get the inserted user ID
        const userId = result.insertId;

        // Retrieve the newly inserted user data
        const fetchUserSql = "SELECT * FROM registered WHERE ID = ?";
        db.query(fetchUserSql, [userId], (fetchErr, userData) => {
            if (fetchErr) {
                console.error(fetchErr);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            // Return the newly inserted user data
            return res.status(201).json(userData[0]);
        });
    });
});
