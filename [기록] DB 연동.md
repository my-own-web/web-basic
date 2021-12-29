# [기록] DB 연동

동주님 영상 정리

## es6  vs commonjs 문법

es6: `import mysql from "mysql";`  
commonjs:    `const mysql = require("mysql");`

## RDBMS: **R**elational **D**ata**B**ase **M**anagement **S**ystem

관계형 데이터베이스  
Database - Table - rows(record)/columns(fields)  
각 테이블이 서로 관계를 맺고 있다  
(eg) MYSQL

vs NoSQL

## HTTP 통신 METHOD

REST API METHOD

1. GET: 데이터를 서버에서 가져옴  
2. POST: 데이터를 서버로 부침
3. DELETE: 삭제
4. PUT: 기존 데이터 업데이트
5. PATCH: 데이터를 주고받지 않고 특정 작업을 유발. (eg) 강제로 정보 갱신 

## express, MYSQL 연동

### 필요한 라이브러리

서버: express, cors, body-parser  
클라이언트: axios (vs fetch())

### 서버 코드

`yarn add express`: 라이브러리 설치  
`node server.js`: server.js(서버코드) 실행

```javascript
const express = require('express')
const app = express() // express 실행한 것을 받음
const port = 3001

// cors policy 무시
const cors = require('cors');
app.use(cors());

// POST 요청 통해 서버에서 데이터를 받기 위해 선언
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB(MYSQL) 연동
const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config(); // 민감한 정보 숨기기 위해 사용 

const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: // 동시에 처리되는 createPool 최대 개수
}
// database는 table 아님 

let globalPool;
function DB_Connection() {
  if (globalPool) return globalPool;
  globalPool = mysql.createPool(options);
  return globalPool;
}

// 라우트에 대한 요청에 응답
// 다른 모든 경로: 404 Not Found로 응답
app.get('/', async (req, res) => {
  const pool = DB_Connection();
  const conn = await pool.getConnection(); 
  // DB로 쿼리 요청 가능한 연결 시도 

  try {
    const [rows] = await conn.query('SELECT * FROM todos');
    todos = rows;
    const [col] = await conn.query(`SELECT MAX(id) AS maxID FROM todos`);
    res.send({todos, nextID: col[0].maxID+1}); // 클라이언트에 데이트 전송
  } catch (error) {
    console.log(error);
  } finally {
    conn.release(); // 연결 끊기 
  }
})

app.post('/', async (req, res) => {
    // req.body : 클라이언트 코드에 보내는 request 데이터 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

> **Cors policy**
> 
> 도메인(baseURL)이 같지 않은 클라이언트와 서버간의 통신이 제한됨. (안전상의 이유로 chrome 등이 제한)

> **.env**
> 
> 민감한 정보 저장.   
> github에 올리면 안 됨! `.gitignore`에 넣기.  
> (eg) MYSQL_HOST="URL"

> createPool vs createConnection

> **MYSQL 쿼리**
> 
> 쿼리 스트링 밖 변수 사용 예시:
> 
> ```javascript
> const varID = 1;
> const [col] = await conn.query(
>     `SELECT done 
>     FROM todos 
>     WHERE id=${varID}`
> ); 
> ```

### 클라이언트 코드

`async`함수 내부 코드

```javascript
// 서버에서 데이터 받기
try{
 const {data} = await axios.get("URL");
} catch(error){
 console.log(error)
}
```

> **try catch 문**
> 
> ```javascript
> try{} // 여기에서 에러가 생기면 바로 catch문 실행
> catch(error){} // 에러 처리 
> finally{} // try문 또는 catch문이 끝나면 실행 
> ```

## 기타

### 커밋 메시지 타입

* Feat: 새로운 기능
* Fix: 버그 수정
* Build: 빌드 관련 파일 수정
* Chore: 그 외 자잘한 수정
* Ci: CI 관련 설정 수정
* Docs: 문서 수정
* Style: 코드 스타일/포멧 등 
* Refactor: 코드 리팩토링
* Test: 테스트 코드 수정

### React 시작

`yarn init` -> package.json 수정 -> `yarn start` script 작성 

> <mark>script{start: node app.js}</mark> 확인 필요

`useEffect(콜백함수, [])`: 렌더링 전 한 번 실행

### React Skeleton

깜빡거리는 현상(데이터를 받는 로딩 상태) 대신 Skeleton 보임
