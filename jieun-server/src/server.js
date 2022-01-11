const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const { pbkdf2, pbkdf2Sync } = require('crypto');
const Cookies = require('universal-cookie');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // 크로스 도메인 허용
}));
app.use(bodyParser.json());
app.use(cookieParser());

const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config();

const salt = process.env.SECRET_KEY;

const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}

let globalPool;
function DB_Connection() {
  if (globalPool) return globalPool;
  globalPool = mysql.createPool(options);
  return globalPool;
}

app.post('/login', async (req, res) => {
  const inputs = req.body;

  const cryptedId = pbkdf2Sync(inputs.id, salt, 65000, 32, "sha512").toString("hex");
  const cryptedPassword = pbkdf2Sync(inputs.password, salt, 65000, 32, "sha512").toString("hex");

  const pool = DB_Connection();
  const conn = await pool.getConnection();

  try {
    const [row] = await conn.query(`SELECT COUNT(*) AS num FROM users WHERE id='${cryptedId}' AND password='${cryptedPassword}'`);
    console.log(row[0]);
    if (row[0].num) {
      res.cookie('valid', 'valid', {
        path: '/',
        maxAge: 60 * 60 * 1000 // 1시간 후 만료
      });
      res.send(true);
    }
    else {
      res.status(401).send(false);
    }
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }

});

app.post('/join', async (req, res) => {
  const inputs = req.body;

  const cryptedId = pbkdf2Sync(inputs.newId, salt, 65000, 32, "sha512").toString("hex");
  const cryptedPassword = pbkdf2Sync(inputs.newPassword, salt, 65000, 32, "sha512").toString("hex");

  const pool = DB_Connection();
  const conn = await pool.getConnection();

  try {
    const [exist] = await conn.query(`SELECT COUNT(*) AS num FROM users WHERE id='${cryptedId}'`);
    if (exist[0].num < 1) {
      await conn.query(`INSERT INTO users(id, password) VALUES ('${cryptedId}', '${cryptedPassword}')`);
      res.send(true);
    }
    else {
      res.send(false);
    }

  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }
});

app.post('/todos', async (req, res) => {
  const action = req.body;
  console.log('post', action);
  console.log('cookies:', req.cookies);
  if (req.cookies.valid) {

    const pool = DB_Connection();
    const conn = await pool.getConnection();

    try {
      switch (action.type) {
        case 'FETCH':
          break;
        case 'CREATE':
          await conn.query(`INSERT INTO todos VALUES (${action.todo.id}, '${action.todo.text}', ${action.todo.done})`);
          break;
        case 'TOGGLE':
          const [col] = await conn.query(`SELECT done FROM todos WHERE id=${action.id}`);
          await conn.query(`UPDATE todos SET done=${!col[0].done} WHERE id=${action.id}`);
          break;
        case 'REMOVE':
          conn.query(`DELETE FROM todos WHERE id=${action.id}`);
          break;
        case 'EDIT':
          await conn.query(`UPDATE todos SET text='${action.text}' WHERE id=${action.id}`);
          break;
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
      const [rows] = await conn.query('SELECT * FROM todos');
      const [col] = await conn.query(`SELECT MAX(id) AS maxID FROM todos`);
      res.send({
        todos: rows,
        nextID: col[0].maxID + 1
      });
    } catch (error) {
      console.log(error);
    } finally {
      conn.release();
    }
  }
  else {
    res.status(401).send('invalid');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
