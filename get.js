//Mysql
app.get("/users", (request, response) => {
    const query = "SELECT * FROM registered";

    db.query(query, (err, data) => {
        return response.json(data); 
    });
});

//Local Data
app.get("/users", (request, response) => {
    return response.send(mockUsers); 
});
