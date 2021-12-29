const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");

const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config();
const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 400,
};
let globalPool;
function connectDB() {
  if (!globalPool) {
    globalPool = mysql.createPool(options);
  }
  return globalPool;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/api/todo", async (req, res) => {
  const pool = connectDB();
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM todo");
    console.log(rows);
    res.send(rows);
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
});

app.post("/api/todo", (req, res) => {
  todoList = req.body.todo;
  console.log(todoList);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
