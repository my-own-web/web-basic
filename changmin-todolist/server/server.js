const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");

let todoList = [
  {
    id: 0,
    text: "투두리스트 틀 만들기",
    done: true,
    edit: false,
  },
  {
    id: 1,
    text: "투두리스트 기능 구현하기",
    done: true,
    edit: false,
  },
  {
    id: 2,
    text: "로그인 구현하기",
    done: false,
    edit: false,
  },
  {
    id: 3,
    text: "투두리스트 수정기능 만들기",
    done: true,
    edit: false,
  },
  {
    id: 4,
    text: "서버와 연결하기",
    done: false,
    edit: false,
  },
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.post("/api/todo", (req, res) => {
  switch (req.body.type) {
    case "GET":
      res.send(todoList);
      break;
    case "SET":
      todoList = req.body.todo;
      break;
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
