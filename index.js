const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

app.use(express.json());

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
});

app.post("/items", (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO items (name) VALUES (?)", [name], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
