const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());

// POST 요청을 통해 데이터를 받기 위해 선언
router.use(express.json()); //JSON 형식의 데이터 받음
router.use(express.urlencoded({ extended: true }));

const dotenv = require("dotenv").config();

const mysql = require('mysql2/promise');

const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 400, //createPool의 최대 개수?
};

let globalPool; //DB와의 통신에 필요한 기본적인 정보
function DB_connection() {
  // 매 요청마다 이 함수를 실행시키면서 globalPool 값을 얻어옴
  if (globalPool) {
    return globalPool;
  }
  globalPool = mysql.createPool(options); //undefined 상태일 때
  // createPool vs createConnection
  return globalPool;
}

/*let initialTodos = [
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
];*/

router.get('/', async (req, res) => {
  //DB로부터 todo 데이터를 가져와서
  const pool = DB_connection();
  //DB로 쿼리 요청이 가능한 연결시도
  const conn = await pool.getConnection();
  try {// SELECT /UPDATE/DELETE/INSERT/...
    //const result = conn.query("SELECT * FROM todo"); //todo table로부터 모든 데이터를 가져옴
    const [rows] = await conn.query("SELECT * FROM todo");
    //console.log(rows); //데이터 출력
    res.send(rows);
  } catch (err) {
    console.log(err);
  } finally { //finally: 항상 마지막에 실행됨
    conn.release(); //DB 연결을 끊어줌
  }
  //res.send(initialTodos);
});

router.post("/create", async (req, res) => {
  const pool = DB_connection();
  const conn = await pool.getConnection();
  const body = req.body;
  const id = body.id;
  const text = body.text;
  const done = body.done;
  try {
    const [rows] = await conn.query(`INSERT INTO todo VALUES (${id}, '${text}', ${done})`);
    res.send(rows);
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
  //const body = req.body;
  //initialTodos = body;
});

router.put("/toggle", async (req, res) => {
  const pool = DB_connection();
  const conn = await pool.getConnection();
  const id = req.body.id;
  try {
    const [rows] = await conn.query(`UPDATE todo SET done = 1-done WHERE id=${id}`);
    res.send(rows);
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
  //const body = req.body;
  //initialTodos = body;
});

router.put("/remove", async (req, res) => {
  const pool = DB_connection();
  const conn = await pool.getConnection();
  const id = req.body.id;
  try {
    const [rows] = await conn.query(`DELETE FROM todo WHERE id=${id}`);
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
  /*const body = req.body;
  initialTodos = body;*/
})

router.put("/edit", async (req, res) => {
  /*const body = req.body;
  initialTodos = body;
  res.send(initialTodos);
  console.log(body);*/
  const pool = DB_connection();
  const conn = await pool.getConnection();
  const id = req.body.id;
  const text = req.body.text;
  try {
    const [rows] = await conn.query(`UPDATE todo SET text='${text}' WHERE id=${id}`);
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
})

module.exports = router;