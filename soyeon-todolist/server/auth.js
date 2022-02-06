const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const SECRET_KEY = process.env.SECRET_KEY;
const Cookies = require("universal-cookie");

exports.verifyToken = (req, res, next) => {
  try {
    const clientToken = req.cookies.userInf;
    //console.log(req);
    //const cookies = new Cookies(req.headers.cookie);
    //const clientToken = cookies.get("userInf");

    console.log(clientToken); /////////////

    const decoded = jwt.verify(clientToken, SECRET_KEY);

    console.log(decoded); ////////////

    if (decoded) {
      console.log('VALID_TOKEN');
      res.send(decoded.ID);
      next();
    }
    else {
      console.log('INVALID_TOKEN');
      res.status(401).send('INVALID_TOKEN');
    }
  } catch (err) {
    console.log(err);
    console.log('EXPIRED_TOKEN');
    res.status(401).send('EXPIRED_TOKEN');
  }
};
