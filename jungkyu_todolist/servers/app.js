const express = require("express");
//const req = require("express/lib/request");
const app = express();
const port = 3002;
const cors = require("cors");
const { response } = require("express");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const dotenv = require("dotenv").config();

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

app.post('/',async(req,res)=>{
  const body = req.body;
  const pool = DB_connection();
  const conn = await pool.getConnection();
  try{
    const[row] = await conn.query(`SELECT COUNT(*) AS num FROM users WHERE id='${body.id}' AND password='${body.password}'`);
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

  try{
    const [exist] = await conn.query(`SELECT COUNT(*) AS num FROM users WHERE id='${body.newId}'`);
    if(exist[0].num<1){
      await conn.query(`INSERT INTO users(id, password) VALUES ('${body.newId}', '${body.newPassword})`);
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


app.post("/todo",(request, response)=>{
  const body = request.body;
  const pool = DB_connection();
  const conn = await pool.getConnection();

  switch(body.type){
    case 'CREATE':
      try{
        await conn.query(`INSERT INTO todo VALUES (${body.todo.id}, '${body.todo.text}', ${body.todo.done})`);
      }catch(err){
        console.error(err);
      }finally{
        conn.release();
      }
      break;
    case 'TOGGLE':
      try{
        const [col] = await conn.query(`SELECT done FROM todo WHRER id= ${body.id}`);
        await conn.query(`UPDATE todo SET done = ${!col[0].done} WHERE id=${action.id}`);
      }catch(err){
        console.error(err);
      }finally{
        conn.release();
      }
      break;
    case 'REMOVE':
      try{
        conn.query(`DELETE FROM todo WHERE id=${body.id}`);
      }catch(err){
        console.error(err);
      }finally{
        conn.release();
      }
      break;
    case 'EDIT':
      try{
        await conn.query(`UPDATE todo SET text = '${body.text}' WHERE id=${body.id}`);
      }catch(err){
        console.error(err);
      }finally{
        conn.release();
      }
      break;
    default:
      conn.release();
  }
});

app.get("/todo",async (request, response)=>{
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