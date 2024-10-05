app.get("/users/:id", (request, response) => {
    const parsedId = parseInt(request.params.id);
    const query = "SELECT * FROM registered";
    
    db.query(query, [parsedId], (err, data) => {
        return response.json(data[0]);
    });
    
});
