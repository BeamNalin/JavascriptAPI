const Database = require("better-sqlite3");

const db = new Database("book.sqlite");

db.exec(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT, author TEXT)"
);

module.exports = db; // turnback to db