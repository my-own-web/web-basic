const express = require('express');
const router = express.Router();
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const { useState } = require('react/cjs/react.production.min');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

let todos = [
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

const infos = [{
  id: 'id',
  password: 'password',
  login: false
},
{
  id: 'jieun',
  password: 'kwon',
  login: false
},
{
  id: 'a',
  password: 'b',
  login: false
}];

app.post('/info',(req,res)=>{
    console.log('req.body: ', req.body);

    // infos 배열에 id, password가 존재하면 true
    // 없으면 false 반환
      const index = infos.find((element) => element.id === req.body.id);
      if (index && index.password === req.body.password) {
        res.send(true);
        console.log('valid: true');
      }
      else {
        res.send(false);
        console.log('valid: false');
      }

});

app.post('/todos',(req,res)=>{
    const data = req.body;
    todos = data;
    console.log('post', data);
    // res.send(data.newTodos);
    
    // switch(data.action){
    //     case 'FETCH':
    //         res.send(initialTodos);
    //         console.log('fetch ', initialTodos);
    // }
    // console.log(password);
});

app.get('/todos', (req, res)=>{
    res.send(todos);
    console.log('send ', todos);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
