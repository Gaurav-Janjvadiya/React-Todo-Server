const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");

router
  .route("/")
  .get(todoController.indexRoute)
  .post(todoController.createTodo);

module.exports = router;
