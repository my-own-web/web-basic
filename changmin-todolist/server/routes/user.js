const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

router.post("/login", userController.createToken);
router.post("/register", userController.createNewUser);
router.post("/unregister", userController.removeUser);
router.post("/auth", authMiddleware.verifyToken);

module.exports = router;
