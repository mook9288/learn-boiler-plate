const express = require("express");
const app = express();
const port = 5000;
const config = require("./config/key");
const { User } = require("./models/User");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((error) => console.log("config", config.mongoURI));

app.get("/", (req, res) => res.send("Hello World! 안녕?!!!"));

app.post("/register", (req, res) => {
  // 회원가입할때 필요한 정보들을 Client에서 가져와서 데이터베이스에 넣어준다.
  const user = new User(req.body);

  user.save((error, userInfo) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
