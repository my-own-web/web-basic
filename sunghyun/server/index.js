import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

const app=express();
const port=8000;

//http method : get, post, delete, put, patch
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

dotenv.config();

const mysql_conn_info={
  host:process.env.DB_HOST,
  user:process.env.DB_USERNANE,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  connectionLimit:500
};

let todoListPool;

function todoListDBConnection(){
  if(todoListPool){
    return todoListPool;
  }
  try{
    console.log(mysql_conn_info);
    todoListPool=mysql.createPool(mysql_conn_info);
  }
  catch(err){
    console.log(err);
  }
  return todoListPool;
}



app.get("/todoall", async (req, res)=>{
  const pool=todoListDBConnection();
  //console.log("풀 받아옴");
  const conn=await pool.getConnection();

  try{
    const [rows]=await conn.query("select * from todolist");
    console.log(rows);
    res.send(rows);
  }
  catch(err){
    throw err;
  }
  finally {
    conn.release();
  }
})

app.post("/todocreate", async (req, res)=>{
  const data=req.body;
  console.log(data);
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();

  try{
    await conn.query("insert into todolist (text, done, editing) values(?,?,?)", data.text, data.done, data.editing);
  }
  catch(err){
    throw err;
  }
  finally {
    conn.release();
  }
});

app.post("/todotoggle", async (req, res)=>{
  const reqid=req.body;
  console.log(reqid);
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();

  try{
    await conn.query("update todolist set done=1-done where id=?", reqid);
  }
  catch(err){
    throw err;
  }
  finally {
    conn.release();
  }
});

app.listen(port, (req, res)=>{
  console.log(`server port 8000`);
});