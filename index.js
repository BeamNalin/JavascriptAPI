const { request, response } = require("express");
const express = require("express")
const db = require("./db") // import file db
const app = express()

app.use(express.json());  // บอกให้ express รู้จัก json

app.get("/", (request, response) => {
    // response.send("<h1>Datarockie</h1>") // เป็นการบอกว่าจะให้คืน respones อะไร
    response.json({
        name:'beam'
    })
})

app.post("/books", (request, response) => {
    //const title = request.body.title;
    //const author = request.body.author;
    const {title, author} = request.body;

    // prepare ช่วยให้เขียน sql ง่ายขึ้น
    const statement = db.prepare(
        "INSERT INTO books (title, author) VALUES (?,?)"
    );
    const result = statement.run(title, author)
    response.json(result)
});

app.get("/books", (request, response) => {
    const statement = db.prepare("SELECT * FROM books")
    const result = statement.all()
    response.json(result)
})

app.get("/books/:id", (request, response) => {
    const { id } = request.params;

    const statement = db.prepare(`SELECT * FROM books WHERE id=${id}`);
    const result = statement.get();
    response.json(result);
})

app.patch("/books/:id", (request, response) => {
    const { id } = request.params;
    const { title } = request.body;

    const statement = db.prepare("UPDATE books SET title = ? WHERE id = ?")
    const result = statement.run(title, id);
    response.json(result);
})

app.delete("/books/:id", (request, response) => {
    const { id } = request.params;

    const statement = db.prepare("DELETE FROM books WHERE id = ?")
    const result = statement.run(id);
    response.json(result);
})

app.listen(3000,() => {
    console.log("Application started at http://localhost:3000");
});


