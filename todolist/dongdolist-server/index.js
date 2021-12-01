const express = require("express");
const app = express();
const port = 3100;

// 초기 에러 극복
// http://localhost:3000 => http://localhost:3100
const cors = require("cors");
app.use(cors());

const data = [
  { id: 1, text: "남문 통과하기", done: true },
  { id: 2, text: "외판원 순회 문제 해결하기", done: false },
  { id: 2, text: "외판원 순회 문제 해결하기", done: false },
];

app.get("/api/todo", (request, response) => {
  response.send({
    status: 200,
    data,
  });
});

app.post("/api/todo", (request, response) => {
  // request에서 받아온 데이터를
  // data.push(받아온 데이터)
});

app.delete("/api/todo", (request, response) => {
    
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
