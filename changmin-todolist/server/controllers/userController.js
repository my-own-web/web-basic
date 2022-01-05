const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config();
const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 400,
};
const SECRET_KEY = process.env.JWT_SECRET_KEY;

let globalPool;
function connectDB() {
  if (!globalPool) {
    globalPool = mysql.createPool(options);
  }
  return globalPool;
}

exports.createToken = async (req, res) => {
  console.log(req.body);

  const pool = connectDB();
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query(
      `SELECT * FROM user WHERE username = '${req.body.username}' AND password = '${req.body.password}'`
    );

    if (rows.length) {
      const token = jwt.sign(
        {
          username: rows[0].username,
        },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("user", token, {
        path: "/",
        maxAge: 60 * 60 * 1000,
      });
      res.send("OK");
    } else {
      res.status(400).send("USER_NOT_FOUND");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("INTERNAL_ERROR");
  } finally {
    conn.release();
  }
};

exports.createNewUser = async (req, res) => {
  const pool = connectDB();
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query(
      `SELECT * FROM user WHERE username = '${req.body.username}'`
    );

    if (!rows.length) {
      await conn.query(
        `INSERT INTO user (username, password) VALUES ('${req.body.username}', '${req.body.password}')`
      );
      res.send("OK");
    } else {
      res.status(400).send("USER_EXISTS");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } finally {
    conn.release();
  }
};
