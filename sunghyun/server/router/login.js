import express from "express";
import {pbkdf2Sync, randomBytes} from "crypto";
import todoListDBConnection from "../dbConnection.js";

const router=express.Router();

router.post("/signup", async(req, res)=>{
  const newUser=req.body;
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();

  //console.log(pbkdf2Sync(newUser.password, "salt", 65536, 32, 'sha512').toString('hex'));

  try{
    const [rows]=await conn.query("select * from userinfo where username=?", newUser.username);
    //중복 아이디인지 체크
    if(rows.length){
      //같은 유저네임을 가진 데이터가 있는 것이므로 중복된 유저네임이 존재
      //console.log(rows);
      res.send(rows);
    } else{
      const randomSalt=randomBytes(32).toString('hex');
      const cryptedPassword=pbkdf2Sync(newUser.password, randomSalt, 65536, 32, 'sha512').toString('hex');
      const passwordWithSalt=randomSalt+"$"+cryptedPassword;
      //console.log(passwordWithSalt);
      await conn.query("insert into userinfo (username, password) values(?,?)", [newUser.username, passwordWithSalt]);
      res.send([]);
    }
  } catch(err){
    throw err;
  } finally {
    conn.release();
  }
})

const verifyPasswordWithEncrypted=async (givenPassword, encryptedPasswordWithSalt)=>{
  const [salt, encryptedPassword] = encryptedPasswordWithSalt.split("$");
  const givenPasswordEncrypted = pbkdf2Sync(givenPassword, salt, 65536, 32, "sha512").toString("hex");
  //console.log(encryptedPassword, givenPasswordEncrypted);
  if (givenPasswordEncrypted === encryptedPassword) {
    return 1;
  }
  else {
    return 0;
  }
}

router.post("/verify", async (req, res)=>{
  console.log(req.body);
  const {username:usernameInput, password:passwordInput}=req.body;
  //loginInput에 담겨 전송된 비밀번호는 평문 상태
  console.log(usernameInput, passwordInput);
  const pool=todoListDBConnection();
  const conn=await pool.getConnection();

  try{
    const [rows]=await conn.query("select * from userinfo where username=?", usernameInput);

    if(rows.length){
      const sameUsernameInfo=rows[0];
      const result=await verifyPasswordWithEncrypted(passwordInput, sameUsernameInfo.password)
      if(result){
        //같은 비밀번호임
        //console.log(sameUsernameInfo.id);
        res.send({id:sameUsernameInfo.id});
        //로그인 성공시 그 유저의 id를 response 로 전송
      }
      else{
        res.send({id:0});
        //아이디가 같은 유저는 있으나 패스워드가 틀렸다
      }
    }
    else{
      res.send({id:0});
      //아이디가 같은 유저조차도 없다
    }
  } catch(err){
    throw err;
  } finally {
    conn.release();
  }
});

export default router;