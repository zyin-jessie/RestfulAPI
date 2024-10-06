app.delete('/users/:id', (request, response) => {
    const parsedId = parseInt(request.params.id);
    const query = "DELETE FROM registered WHERE id = ?";
    
    db.query(query, [parsedId], (err, data) => {
        if (err)return response.status(500);
        return response.json(data);
    })
})
