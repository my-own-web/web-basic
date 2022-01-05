const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.createToken);
router.post("/register", userController.createNewUser);

module.exports = router;
