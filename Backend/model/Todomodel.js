const mongoose = require("mongoose");
const Todomodel = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  }
});
const TodoSchema = mongoose.model("TodoSchema", Todomodel);
module.exports = TodoSchema;
