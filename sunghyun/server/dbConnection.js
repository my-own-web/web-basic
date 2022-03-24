import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const mysql_conn_info={
  host:process.env.DB_HOST,
  user:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  connectionLimit:500
};

function todoListDBConnection(){
  let todoListPool;
  try{
    //console.log(mysql_conn_info);
    todoListPool=mysql.createPool(mysql_conn_info);
  }
  catch(err){
    console.log(err);
  }
  return todoListPool;
}

export default todoListDBConnection;