app.get("/users/:id", (request, response) => {
    const query = "SELECT * FROM registered";
    
    db.query(query, (err, data) => {
        return response.json(data[0]);
    });
    
});

app.get("/users/:id", (request, response) => {
    const parsedId = parseInt(request.params.id);
    const query = "SELECT * FROM registered";

    db.query(query, (err, data) => {

        const find = data.find((user) => user.id == parsedId);
        return response.json(find);
    });
    
});
