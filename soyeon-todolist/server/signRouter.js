const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors({ origin: true, credentials: true }));
//router.use(cors({ origin: 'http://localhost:3000', credentials: true }));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const { pbkdf2, pbkdf2Sync } = require('crypto');

const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const mysql = require('mysql2/promise');
const SECRET_KEY = process.env.SECRET_KEY;
const randomSalt = process.env.SALT;

const middleware = require('./auth');

const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 400,
};

let globalPool;
function DB_connection() {
  if (globalPool) {
    return globalPool;
  }
  globalPool = mysql.createPool(options);
  return globalPool;
}

router.post('/login', async (req, res) => {
  const pool = DB_connection();
  const conn = await pool.getConnection();
  try {
    //const haveUser = req.body.didLogin;
    const id = req.body.ID;
    const password = req.body.Password;
    let haveUser;

    const cryptedPassword = pbkdf2Sync(password, randomSalt, 65536, 32, "sha512").toString("hex");
    //const [rows] = await conn.query(`SELECT COUNT(*) AS num FROM users WHERE ID='${id}' AND Password='${cryptedPassword}'`);
    const sql = `SELECT COUNT(*) AS num FROM users WHERE ID=? AND Password=?`;
    const params = [id, cryptedPassword];
    const [rows] = await conn.query(sql, params);

    if (rows[0].num)
      haveUser = true;
    else
      haveUser = false;

    if (haveUser) {
      const token = jwt.sign({
        ID: id  //payload: 데이터
      }, SECRET_KEY, {
        expiresIn: '1h' //options
      });
      //console.log(token);
      res.cookie('userInf', token, {
        path: "/",
        maxAge: 60 * 60 * 1000, //만료시간 1 hour
      }); //userInf라는 이름의 cookie 생성

      res.send('OK');
    } else {
      res.send('Invalid User');
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  finally {
    conn.release();
  }
});


router.get('/', async (req, res) => {
  const pool = DB_connection();
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM users");
    res.send(rows);
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
  //res.send(users);
});

router.post('/account', async (req, res) => {
  const pool = DB_connection();
  const conn = await pool.getConnection();
  const body = req.body;
  const id = body.ID;
  const password = body.Password;

  const cryptedPassword = pbkdf2Sync(password, randomSalt, 65536, 32, 'sha512').toString('hex');

  try {
    //const [rows] = await conn.query(`INSERT INTO users VALUES ('${id}', '${cryptedPassword}')`);
    const sql = `INSERT INTO users VALUES (?, ?)`;
    const params = [id, cryptedPassword];
    await conn.query(sql, params);
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
  //const body = req.body;
  //users에 body 추가
  //users.push(body);
})

router.put("/delete", async (req, res) => {
  const pool = DB_connection();
  const conn = await pool.getConnection();
  const id = req.body.id;
  try {
    const sql = `DELETE FROM users WHERE ID=?`
    const params = [id];
    await conn.query(sql, params);
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
})

router.post("/auth", middleware.verifyToken);

module.exports = router;