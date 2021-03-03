const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  note: String,
  status: String,
  Date: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("Todo", todoSchema);
