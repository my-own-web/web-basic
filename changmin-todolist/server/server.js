const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/todo", todoRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
