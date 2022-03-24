import express from 'express';
import cors from 'cors';
import session from 'express-session';
import todoListDBConnection from "./dbConnection.js";
import loginRouter from './router/login.js';
import todoRouter from './router/todo.js';
const app=express();
const port=8000;

//http method : get, post, delete, put, patch
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
  secret:'sunghyun',
  resave:false,
  saveUninitialized:false
}));

app.use("/api/todo", todoRouter);
app.use("/api/login", loginRouter);

app.listen(port, (req, res)=>{
  console.log(`server port 8000`);
});