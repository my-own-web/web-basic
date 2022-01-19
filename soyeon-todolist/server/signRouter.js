const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const mysql = require('mysql2/promise');
const SECRET_KEY = process.env.SECRET_KEY;

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

/*let users = [
  {
    ID: 'hello1',
    Password: 'hi1'
  },
  {
    ID: 'hello2',
    Password: 'hi2'
  },
  {
    ID: 'hello3',
    Password: 'hi3'
  }
];*/



router.get('/makejwt', async (req, res, next) => {
  try {
    haveUser = req.body[0];
    ID = req.body[1];
    if (haveUser) {
      const token = jwt.sign({
        ID: { ID }
      }, SECRET_KEY, {
        expiresIn: '1h'
      });

      res.cookie('userInf', token);
      res.status(201).json({
        result: 'ok',
        token
      });
    } else {
      res.status(400).json({ error: 'invalid user' });
    }
  } catch (err) {
    console.log(err);
  }

});


/*async function createToken(req, res, next) {
  try {
    
    if (rows.length){
      const token = jwt.sign({
        user_id: rows.
      }, SECRET_KEY, {
        expiresIn: '1h'
      });
    }

  } catch (err) {
    console.log(err);
  }
}*/

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
  try {
    const [rows] = await conn.query(`INSERT INTO users VALUES ('${id}', '${password}')`);
    res.send(rows);
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
  //const body = req.body;
  //users에 body 추가
  //users.push(body);
})

module.exports = router;