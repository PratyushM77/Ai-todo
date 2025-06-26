const express = require("express");
const app = express();
const db = require("./db");
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const dealtodos = require("./Routes/Todoitems");
const User = require("./Routes/User")
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(express.json());
app.use("/", dealtodos);
app.use("/",User)

app.listen(3000, console.log("Server listening on Port 3000"));
