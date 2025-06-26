const mongoose = require("mongoose");

MONGO_URI = "mongodb://localhost:27017/tosubmit2";
mongoose.connect(MONGO_URI);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connnected to MongoDB");
});

module.exports = db;
