import express from 'express';
import cors from 'cors';

const app=express();
const port=8000;

//http method : get, post, delete, put, patch
app.use(cors());

app.get("/", (req, res)=>{
  res.send("hello");
})

app.listen(port, (req, res)=>{
  console.log(`server port 8000`);
});