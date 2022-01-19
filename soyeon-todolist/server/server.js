const express = require('express')
const app = express()
//const bodyParser = require('body-parser');
const port = 3001;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todoRouter = require('./todoRouter');
const signRouter = require("./signRouter");

app.use('/todo', todoRouter);
app.use("/sign", signRouter);

app.get('/', (req, res) => { res.send('hi'); });
//서버로부터 페이지에 데이터를 가져오는 과정: get 요청

/*app.get('/todo', (req, res) => {
  res.send(initialTodos);
});*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})