const express = require("express");
const app = express();
const port = 3002;
const cors = require("cors");
const { response } = require("express");
const crypto = require('crypto');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const dotenv = require("dotenv").config();
const salt = process.env.KEY

const mysql = require("mysql2/promise");
const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 400,
};

let globalPool;
function DB_connection(){
  if(globalPool){
    return globalPool;
  }
  globalPool = mysql.createPool(options);
  return globalPool;
};

app.post('/login',async(req,res)=>{
  const body = req.body;
  const pool = DB_connection();
  const conn = await pool.getConnection();

  const crypID = crypto.pbkdf2Sync(body.id, salt, 1, 32, 'sha512').toString('hex');
  const crypPassWord = crypto.pbkdf2Sync(body.password, salt, 1, 32, 'sha512').toString('hex');

  try{
    const[row] = await conn.query(`SELECT COUNT(*) AS num FROM users WHERE id='${crypID}' AND password='${crypPassWord}'`);
    console.log(row[0]);
    if(row[0].num)res.send(true);
    else res.send(false);
  }catch(err){
    console.error(err);
  }finally{
    conn.release();
  }
});

app.post('/signup',async(req,res)=>{
  const body = req.body;
  const pool = DB_connection();
  const conn = await pool.getConnection();

  const crypID = crypto.pbkdf2Sync(body.newId, salt, 1, 32, 'sha512').toString('hex');
  const crypPassWord = crypto.pbkdf2Sync(body.newPassword, salt, 1, 32, 'sha512').toString('hex');

  try{
    const [exist] = await conn.query(`SELECT COUNT(*) AS num FROM users WHERE id='${crypID}'`);
    if(exist[0].num<1){
      await conn.query(`INSERT INTO users(id, password) VALUES ('${crypID}', '${crypPassWord}')`);
      res.send(true);
    }
    else{
      res.send(false);
    }
  }catch(err){
    console.error(err);
  }finally{
    conn.release();
  }
});


app.post("/todo", async (request, response)=>{
  const body = request.body;
  console.log(body);

  const pool = DB_connection();
  const conn = await pool.getConnection();

  let sql, values;

  switch(body.type){
    case 'CREATE':
      try{
        sql = "INSERT INTO todo VALUES (?, ?, ?)";
        values = [body.todo.id, body.todo.text, body.todo.done]
        //await conn.query(`INSERT INTO todo VALUES (${body.todo.id}, '${body.todo.text}', ${body.todo.done})`);

      }catch(err){
        console.error(err);
      }finally{
        conn.release();
      }
      break;
    case 'TOGGLE':
      try{
        sql = "UPDATE todo SET done = 1-done WHERE id=?";
        values = [body.id];

        //await conn.query(`UPDATE todo SET done = 1-done WHERE id=${body.id}`);
      }catch(err){
        console.error(err);
      }finally{
        conn.release();
      }
      break;
    case 'REMOVE':
      try{
        sql = "DELETE FROM todo WHERE id=?";
        values = [body.id];
        //conn.query(`DELETE FROM todo WHERE id=${body.id}`);
      }catch(err){
        console.error(err);
      }finally{
        conn.release();
      }
      break;
    case 'EDIT':
      try{
        sql = "UPDATE todo SET text = ? WHERE id=?";
        values = [body.value, body.id];
        //await conn.query(`UPDATE todo SET text = '${body.value}' WHERE id=${body.id}`);
      }catch(err){
        console.error(err);
      }finally{
        conn.release();
      }
      break;
    default:
      conn.release();
  }
  await conn.query(sql, values);
});

app.get("/todo",async(request, response)=>{
  const pool = DB_connection();
  const conn = await pool.getConnection();
  try{
  const [rows] = await conn.query("SELECT * FROM todo");
  response.send(rows);
  }catch(err){
    console.log(err);
  }finally{
    conn.release();
  }
});

app.listen(port, (request, response)=>{
    console.log(`sever has started on port ${port}`);
});