const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://mook:test1234@inflearn01.r9udb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    // mongoose의 버전이 6 이상부터는 아래 코드 오류!!!
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopologe: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((error) => console.log(error));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
