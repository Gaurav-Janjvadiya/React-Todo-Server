const Todo = require("../models/todo");

module.exports.indexRoute = async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
};

module.exports.createTodo = async (req, res) => {
  const newTodo = new Todo(req.body );
  newTodo.save();
  res.json(newTodo);
};
