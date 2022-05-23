const jwt = require("jsonwebtoken");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config();
const { randomBytes, scrypt } = require("crypto");
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
    const [rows] = await conn.query("SELECT * FROM user WHERE username = ?", [
      req.body.username,
    ]);

    if (rows.length) {
      const [password, salt] = rows[0].password.split("$");

      scrypt(req.body.password, salt, 64, (err, derivedKey) => {
        if (err) throw err;
        if (derivedKey.toString("base64") == password) {
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
        } else res.send("USER_NOT_FOUND");
      });
    } else {
      res.send("USER_NOT_FOUND");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } finally {
    conn.release();
  }
};

exports.createNewUser = async (req, res) => {
  console.log(req.body);

  const pool = connectDB();
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query("SELECT * FROM user WHERE username = ?", [
      req.body.username,
    ]);

    if (!rows.length) {
      const salt = randomBytes(32).toString("base64");

      scrypt(req.body.password, salt, 64, async (err, derivedKey) => {
        if (err) throw err;
        await conn.query(
          "INSERT INTO user (username, password) VALUES (?, ?)",
          [req.body.username, `${derivedKey.toString("base64")}$${salt}`]
        );
      });
      res.send("OK");
    } else {
      res.send("USER_EXISTS");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } finally {
    conn.release();
  }
};

exports.removeUser = async (req, res) => {
  console.log(req.body);

  const pool = connectDB();
  const conn = await pool.getConnection();

  try {
    await conn.query("DELETE FROM user WHERE username = ?", [
      req.body.username,
    ]);
    await conn.query("DELETE FROM todo WHERE username = ?", [
      req.body.username,
    ]);
    res.send("OK");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  } finally {
    conn.release();
  }
};
