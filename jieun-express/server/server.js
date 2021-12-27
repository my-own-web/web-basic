const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const { useState } = require('react/cjs/react.production.min');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

const todos = [
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

app.post('/info',(req,res)=>{
    const info = req.body.id;
    console.log('id: ',info);
    // console.log(password);
});

app.post('/todos/post',(req,res)=>{
    const data = req.body;
    console.log('post', data);
    res.send('post succeed');
    
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
