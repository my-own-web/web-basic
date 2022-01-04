const express = require("express");
const router = express.Router();

const mysql = require("mysql2/promise");
const dotenv = require("dotenv").config();
const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 400,
};

let globalPool;
function connectDB() {
  if (!globalPool) {
    globalPool = mysql.createPool(options);
  }
  return globalPool;
}
