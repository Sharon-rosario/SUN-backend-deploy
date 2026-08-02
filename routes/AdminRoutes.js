const express = require("express");
const router = express.Router();
const {
  createAdmin,
  signInAdmin,
} = require("../controllers/AdminController.js");

router.post("/", createAdmin);
router.post("/sign-in/", signInAdmin);

module.exports = router;
