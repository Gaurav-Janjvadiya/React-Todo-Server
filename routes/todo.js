const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");
const { wrapAsync } = require("../middlewares");

router
  .route("/")
  .get(wrapAsync(todoController.indexRoute))
  .post(wrapAsync(todoController.createTodo));

module.exports = router;
