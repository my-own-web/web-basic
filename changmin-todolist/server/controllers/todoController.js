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

exports.getTodoList = async (req, res) => {
  const username = req.body.username;

  const pool = connectDB();
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM todo WHERE username = ?", [
      req.body.username,
    ]);
    console.log(rows);
    res.send(rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } finally {
    conn.release();
  }
};

exports.editTodoList = async (req, res) => {
  const username = req.body.username;
  const action = req.body.action;

  console.log(action);

  const pool = connectDB();
  const conn = await pool.getConnection();
  try {
    let sql, values;
    switch (action.type) {
      case "CREATE":
        sql = "INSERT INTO todo (username, id, text, done) VALUES (?, ?, ?, ?)";
        values = [username, action.todo.id, action.todo.text, action.todo.done];
        break;
      case "TOGGLE":
        sql = "UPDATE todo SET done = 1 - done WHERE username = ? AND id = ?";
        values = [username, action.id];
        break;
      case "REMOVE":
        sql = "DELETE FROM todo WHERE username = ? AND id = ?";
        values = [username, action.id];
        break;
      case "EDIT":
        sql = "UPDATE todo SET text = ? WHERE username = ? AND id = ?";
        values = [action.editText, username, action.id];
        break;
      default:
        throw new Error(`Undefined Action: ${action.type}`);
    }
    console.log(`${sql} / ${values}`);
    await conn.query(sql, values);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } finally {
    conn.release();
  }
};
