const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.post("/get", todoController.getTodoList);
router.post("/edit", todoController.editTodoList);

module.exports = router;
