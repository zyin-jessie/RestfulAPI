app.put('/users/:id', (request, response) => {
    const parsedId = parseInt(request.params.id);
    const { fname, lname } = request.body;
    const query = "UPDATE registered SET fname = ?, lname = ? WHERE id = ?";

    db.query(query, [fname, lname, parsedId], (err, data) => {
        if (err)return response.status(500);
        return response.json(data);
    });
})
