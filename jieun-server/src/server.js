const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const { pbkdf2Sync } = require('crypto');
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

  // 사용자 비밀번호 암호화
  const cryptedPassword = pbkdf2Sync(inputs.password, salt, 65000, 32, "sha512").toString("hex");

  const pool = DB_Connection();
  const conn = await pool.getConnection();

  let query;
  try {
    query = 'SELECT COUNT(*) AS num FROM users WHERE id=? AND password=?';
    const [row] = await conn.query(query, [inputs.id,cryptedPassword]);
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
      res.status(401).send({error: 'wrong password'});
    }
  } catch (error) {
    console.log(error);
  } finally {
    conn.release();
  }

});

app.post('/join', async (req, res) => {
  const inputs = req.body;

  const cryptedPassword = pbkdf2Sync(inputs.newPassword, salt, 65000, 32, "sha512").toString("hex");

  const pool = DB_Connection();
  const conn = await pool.getConnection();

  let query;
  try {
    query = 'SELECT COUNT(*) AS num FROM users WHERE id=?';
    const [exist] = await conn.query(query,[inputs.newId]);
    if (exist[0].num < 1) {
      query = 'INSERT INTO users(id, password) VALUES (?,?)';
      await conn.query(query, [inputs.newId, cryptedPassword]);
      query = `CREATE TABLE todos_`+inputs.newId+` (
        id int,
        text varchar(200),
        done tinyint(1),
        PRIMARY KEY (id)
      )`;
      await conn.query(query);
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

  if (decoded) {
    const pool = DB_Connection();
    const conn = await pool.getConnection();

    const clientId = decoded.userID;
    let query1, query2;
    try {
      switch (action.type) {
        case 'FETCH':
          break;
        case 'CREATE':
          query1 = 'INSERT INTO todos_'+clientId+' VALUES (?, ?, ?)';
          await conn.query(query1, [action.todo.id, action.todo.text, action.todo.done]);
          break;
        case 'TOGGLE':
          query1 = 'SELECT done FROM todos_'+clientId+' WHERE id=?';
          query2 = 'UPDATE todos_'+clientId+' SET done=? WHERE id=?';
          const [col] = await conn.query(query1, [action.id]);
          await conn.query(query2, [!col[0].done, action.id]);
          break;
        case 'REMOVE':
          query1 = 'DELETE FROM todos_'+clientId+' WHERE id=?';
          conn.query(query1, [action.id]);
          break;
        case 'EDIT':
          query1 = 'UPDATE todos_'+clientId+' SET text=? WHERE id=?';
          await conn.query(query1, [action.text, action.id]);
          break;
        default:
          throw new Error(`Unhandled action type: ${action.type}`);
      }
      query1 = 'SELECT * FROM todos_'+clientId;
      query2 = 'SELECT MAX(id) AS maxID FROM todos_'+clientId;

      const [rows] = await conn.query(query1);
      const [col] = await conn.query(query2);
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
    // res.clearCookie('valid');
    res.status(401).send('invalid');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
