const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const { pbkdf2, pbkdf2Sync } = require('crypto');
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

const salt = process.env.SECRET_SALT;

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

// jwt
const jwt = require('jsonwebtoken');
const key = process.env.SECRET_KEY;

app.post('/login', async (req, res) => {
  const inputs = req.body;

  // 사용자 정보 암호화
  const cryptedPassword = pbkdf2Sync(inputs.password, salt, 65000, 32, "sha512").toString("hex");

  const pool = DB_Connection();
  const conn = await pool.getConnection();

  try {
    const [row] = await conn.query(`SELECT COUNT(*) AS num FROM users WHERE id='${inputs.id}' AND password='${cryptedPassword}'`);
    console.log(row[0]);
    if (row[0].num) {
      const token = jwt.sign(
        {
          userID: inputs.id
        }, key, {
          expiresIn: '1h'
        }
      );
      res.cookie('valid', token, {path: '/', maxAge: 60*60*1000});
      res.send(true);
    }
    else {
      res.clearCookie('valid');
      res.status(401).send(false);
    }
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }

});

app.post('logout', (req,res) => {
  res.clearCookie('valid');
});

app.post('/join', async (req, res) => {
  const inputs = req.body;

  // const cryptedId = pbkdf2Sync(inputs.newId, salt, 65000, 32, "sha512").toString("hex");
  const cryptedPassword = pbkdf2Sync(inputs.newPassword, salt, 65000, 32, "sha512").toString("hex");

  const pool = DB_Connection();
  const conn = await pool.getConnection();

  try {
    const [exist] = await conn.query(`SELECT COUNT(*) AS num FROM users WHERE id='${inputs.newId}'`);
    if (exist[0].num < 1) {
      await conn.query(`INSERT INTO users(id, password) VALUES ('${inputs.newId}', '${cryptedPassword}')`);
      await conn.query(`CREATE TABLE todos_${inputs.newId} (
        id int,
        text varchar(200),
        done tinyint(1),
        PRIMARY KEY (id)
      )`)
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
  const clientToken = req.cookies.valid;

  const decoded = (clientToken)? jwt.verify(clientToken, key):undefined;

  console.log('post', action);
  console.log('cookies:', decoded);

  if (decoded) {
    const pool = DB_Connection();
    const conn = await pool.getConnection();

    const clientId = decoded.userID; // chk

    try {
      switch (action.type) {
        case 'FETCH':
          break;
        case 'CREATE':
          await conn.query(`INSERT INTO todos_${clientId} VALUES (${action.todo.id}, '${action.todo.text}', ${action.todo.done})`);
          break;
        case 'TOGGLE':
          const [col] = await conn.query(`SELECT done FROM todos_${clientId} WHERE id=${action.id}`);
          await conn.query(`UPDATE todos_${clientId} SET done=${!col[0].done} WHERE id=${action.id}`);
          break;
        case 'REMOVE':
          conn.query(`DELETE FROM todos_${clientId} WHERE id=${action.id}`);
          break;
        case 'EDIT':
          await conn.query(`UPDATE todos_${clientId} SET text='${action.text}' WHERE id=${action.id}`);
          break;
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
      const [rows] = await conn.query(`SELECT * FROM todos_${clientId}`);
      const [col] = await conn.query(`SELECT MAX(id) AS maxID FROM todos_${clientId}`);
      res.send({
        userId: clientId,
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
