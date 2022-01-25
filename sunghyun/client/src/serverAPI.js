import axios from "axios";

const TodoAPI=axios.create({
  baseURL:process.env.NODE_ENV==="development"?"http://localhost:8000/todo":"api/todo"
})

const LoginAPI=axios.create({
  baseURL:process.env.NODE_ENV==="development"?"http://localhost:8000/login":"api/login"
})

export {TodoAPI, LoginAPI};