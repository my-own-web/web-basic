const express = require("express");
const app = express();
const port = 3001;

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const dotenv = require("dotenv").config();

const mysql = require("mysql2/promise");
const options = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

let globalPool;
function DB_connection(){
    if(globalPool){
        return globalPool;
    }
    
    globalPool = mysql .createPool(options);
    
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


//DB에서 TODO 데이터 가져와 response로 보내줌 
app.get("/todo", async (request, response)=>{
    const pool = DB_connection();
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query("SELECT * FROM todo");
        //console.log(rows);
        response.send(rows);
    } catch(err) {
        console.log(err);
    }finally{
        conn.release();
    }
    //response.send(initialTodos);
});
//body의 데이터를 DB에 업로드함
app.post("/todo", (request, response)=>{
    initialTodos = request.body;
});

app.listen(port, (request, response)=>{
    console.log(`server has started on port ${port}`);
});