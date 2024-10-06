app.post('/users', (request, response) => {
    const { fname, lname, email, password } = request.body;
    const query = 'INSERT INTO registered (fname, lname, email, password) VALUES (?, ?, ?, ?)';

    db.query(query, [fname, lname, email, password], (err, data) => {
        if (err)return response.status(500);
        return response.json(data);
    });
});
