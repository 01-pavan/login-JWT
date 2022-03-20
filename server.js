const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/user");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb://localhost:27017/login-JWT", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  const { userName: username, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);
  //   console.log("debug", username, password);
  try {
    const response = await User.create({
      username,
      password,
    });
    console.log("db response", response);
  } catch (err) {
    console.log(err);
    return res.json({ status: "error" });
  }
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("server rocking at 3000");
});
