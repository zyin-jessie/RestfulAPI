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
