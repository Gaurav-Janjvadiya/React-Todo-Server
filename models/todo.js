const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
});

const Todo = new mongoose.model("Todo", todoSchema);

module.exports = Todo;
