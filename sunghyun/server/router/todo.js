import express from "express";
import todoListDBConnection from "../dbConnection.js";

const router=express.Router();

router.get("/all", async (req, res)=>{
  const pool=todoListDBConnection();
  //console.log("풀 받아옴");
  const conn=await pool.getConnection();
  const userId=req.query.user;
  try{
    const [rows]=await conn.query(`select * from todolist where userid=${userId}`);
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

router.post("/create", async (req, res)=>{
  const todoData=req.body.todo;
  const userId=req.body.userid;
  console.log("서버에 보내진 데이터 ",req.body);
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();

  try{
    await conn.query("insert into todolist (text, done, editing, userid) values (?,?,?,?)",
      [todoData.text, todoData.done, todoData.editing, userId]);
    res.sendStatus(200);
  } catch(err){
    throw err;
  } finally {
    conn.release();
  }
});

router.post("/toggle", async (req, res)=>{
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

router.post("/remove", async(req, res)=>{
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

router.post("/edit", async (req, res)=>{
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

export default router;