const express = require("express");
//const req = require("express/lib/request");
const app = express();
const port = 3002;
const cors = require("cors");
const { response } = require("express");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const mysql = require("mysql2/promise");
const options = {
  host:"cnudb.soga.ng",
  user:"cnu",
  password:"r912",
  database: "todo_list",
  connectionLimit: 400,
};
let globalPool;
function DB_connection(){
  if(globalPool){
    return globalPool;
  }
  globalPool = mysql.createPool(options);
  return globalPool;
}

let initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
      },
      {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true
      },
      {
        id: 3,
        text: 'Context 만들기',
        done: false
      },
      {
        id: 4,
        text: '기능 구현하기',
        done: false
      }
];

app.get("/todo",async (request, response)=>{
  const pool = DB_connection();
  const conn = await pool.getConnection();
  try{
  const [rows] = await conn.query("SELECT * FROM todo");
  //console.log(rows);
  response.send(rows);
  //console.log(result);
  }catch(err){
    console.log(err);
  }finally{
    conn.release();
  }

  //response.send(initialTodos);
})


app.post("/todo",(request, response)=>{
  const body = request.body;
  initialTodos = body;
  console.log(request.body.length);

  const pool = DB_connection();
  const conn = await pool.getConnection();
  try{
  //console.log(rows);
  const body = request.body;
  const [body] = await conn.query("UPDATE * FROM todo");
  
  //response.send(rows);
  //console.log(result);
  }catch(err){
    console.log(err);
  }finally{
    conn.release();
  }

})

app.listen(port, (request, response)=>{
    console.log(`sever has started on port ${port}`);
});