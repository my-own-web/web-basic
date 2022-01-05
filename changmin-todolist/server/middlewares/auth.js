const Cookies = require("universal-cookie");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.verifyToken = (req, res, next) => {
  try {
    const cookies = new Cookies(req.headers.cookie);
    const clientToken = cookies.get("user");
    const decoded = jwt.verify(clientToken, SECRET_KEY);
    console.log(decoded);

    if (decoded) {
      console.log("TOKEN_OK");
      res.send(decoded.username);
      next();
    } else {
      console.log("INVALID_TOKEN");
      res.status(401).send("INVALID_TOKEN");
    }
  } catch (err) {
    console.log(err);
    console.log("TOKEN_EXPIRED");
    res.status(401).send("TOKEN_EXPIRED");
  }
};
