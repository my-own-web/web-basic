import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import {pbkdf2Sync, randomBytes} from 'crypto';

const app=express();
const port=8000;

//http method : get, post, delete, put, patch
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
  secret:'sunghyun',
  resave:false,
  saveUninitialized:true
}));

dotenv.config();

const mysql_conn_info={
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
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

app.get("/todo/all", async (req, res)=>{
  const pool=todoListDBConnection();
  //console.log("풀 받아옴");
  const conn=await pool.getConnection();

  try{
    const [rows]=await conn.query("select * from todolist");
    //console.log(rows);
    res.send(rows);
  }
  catch(err){
    throw err;
  }
  finally {
    conn.release();
  }
})

app.post("/todo/create", async (req, res)=>{
  const data=req.body;
  //console.log("서버에 보내진 데이터 ",data);
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();

  try{
    await conn.query("insert into todolist (text, done, editing) values (?,?,?)", [data.text, data.done, data.editing]);
    res.sendStatus(200);
  } catch(err){
    throw err;
  } finally {
    conn.release();
  }
});

app.post("/todo/toggle", async (req, res)=>{
  const data=req.body;
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();
  try{
    await conn.query("update todolist set done=1-done where id=?", data.id);
    res.sendStatus(200);
  } catch(err){
    throw err;
  } finally {
    conn.release();
  }
});

app.post("/todo/remove", async(req, res)=>{
  const data=req.body;
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();

  try{
    await conn.query("delete from todolist where id=?", data.id);
    res.sendStatus(200);
  } catch (err){
    throw err;
  } finally {
    conn.release();
  }
});

app.post("/todo/edit", async (req, res)=>{
  const todo=req.body;
  console.log(todo);
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();

  try{
    await conn.query("update todolist set text=?, done=?, editing=? where id=?", [todo.text, todo.done, !todo.editing, todo.id]);
    res.sendStatus(200);
  } catch(err){
    throw err;
  } finally {
    conn.release();
  }
});

app.post("/signup", async(req, res)=>{
  const newUser=req.body;
  console.log(newUser);
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();

  //console.log(pbkdf2Sync(newUser.password, "salt", 65536, 32, 'sha512').toString('hex'));

  try{
    const [rows]=await conn.query("select * from userinfo where username=?", newUser.username);
    //중복 아이디인지 체크
    //console.log(rows);
    if(rows.length){
      //같은 유저네임을 가진 데이터가 있는 것이므로 중복된 유저네임이 존재
      console.log(rows);
      res.send(rows);
    } else{
      const randomSalt=randomBytes(32).toString('hex');
      const cryptedPassword=pbkdf2Sync(newUser.password, randomSalt, 65536, 32, 'sha512').toString('hex');
      const passwordWithSalt=randomSalt+"$"+cryptedPassword;
      console.log(passwordWithSalt);
      await conn.query("insert into userinfo (username, password) values(?,?)", [newUser.username, passwordWithSalt]);
      res.sendStatus(200);
    }
  } catch(err){
    throw err;
  } finally {
    conn.release();
  }
})

const verifyPasswordWithEncrypted=async (givenPassword, encryptedPasswordWithSalt)=>{
  const [salt, encryptedPassword] = encryptedPasswordWithSalt.split("$");
  const givenPasswordEncrypted = pbkdf2Sync(givenPassword, salt, 65536, 32, "sha512").toString("hex");
  console.log(encryptedPassword, givenPasswordEncrypted);
  if (givenPasswordEncrypted === encryptedPassword) {
    return 1;
  }
  else {
    return 0;
  }
}

app.post("/login/verify", async (req, res)=>{
  console.log(req.body);
  const {username:usernameInput, password:passwordInput}=req.body;
  //loginInput에 담겨 전송된 비밀번호는 평문 상태
  console.log(usernameInput, passwordInput);
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();

  try{
    const [rows]=await conn.query("select * from userinfo where username=?", usernameInput);
    console.log(rows);
    const sameUsernameInfo=rows[0];
    const result=await verifyPasswordWithEncrypted(passwordInput, sameUsernameInfo.password)
    console.log(result);
    if(result){
      //같은 비밀번호임
      res.sendStatus(200);
    }
    else{
      res.sendStatus(206);
    }
  } catch(err){
    throw err;
  } finally {
    conn.release();
  }

})

app.listen(port, (req, res)=>{
  console.log(`server port 8000`);
});