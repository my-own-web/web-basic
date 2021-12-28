const express = require('express');
const router = express.Router();
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const { useState } = require('react/cjs/react.production.min');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config();

const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}

let globalPool;
function DB_Connection(){
  if(globalPool) return globalPool;
  globalPool = mysql.createPool(options);
  return globalPool;
}

let todo;

const infos = [{
  id: 'id',
  password: 'password',
  login: false
},
{
  id: 'jieun',
  password: 'kwon',
  login: false
},
{
  id: 'a',
  password: 'b',
  login: false
}];

app.post('/info',(req,res)=>{
    console.log('req.body: ', req.body);

    // infos 배열에 id, password가 존재하면 true
    // 없으면 false 반환
      const index = infos.find((element) => element.id === req.body.id);
      if (index && index.password === req.body.password) {
        res.send(true);
        console.log('valid: true');
      }
      else {
        res.send(false);
        console.log('valid: false');
      }

});

app.post('/todos',(req,res)=>{
    const data = req.body;
    todos = data;
    console.log('post', data);
});

app.get('/todos', async (req, res)=>{
  const pool = DB_Connection();
  const conn = await pool.getConnection();

  // try{
  // const conn = await pool.getConnections();
  // }
  // catch(error){
  //   console.log(error);
  // }

  try{
  const [rows] = await conn.query('SELECT * FROM todos'); // chk table name
  todos = rows;
  res.send(todos);
  } catch(error){
    console.log(error);
  } finally{
    conn.release();
  }

  // res.send(todos);
  // console.log('send ', todos);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
