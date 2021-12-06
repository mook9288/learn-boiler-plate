# 인프런강의 따라하기

- [따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://inf.run/MBce)

## node js

## express js

```bash
npm install express --save
```

## mongoDB

```bash
npm install mongoose --save
```

```js
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
```

## bodyParser

- Client에서 오는 정보를 서버에서 분석해서 가져올 수 있게 해 줌.

```bash
npm install body-parser --save
```

```js
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
```

- bodyParser를 이용해서 `req.body`로 Client에서 오는 정보를 json 형식으로(`{ id: "hellow", password: "123" }`) 받아준다.

```js
app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save(); // mongoDB에서 오는 메소드,
});
```

### express 4.x버전부터는 express에 bodyParser가 내장된다.

```js
const express = require("express");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```

## postman에서 POST 결과 확인하기

![postman에서 POST 결과 확인하기](./images/07.postman_success.png)

## nodemon

- 소스를 변경할 때를 감지해서 자동으로 서버를 재시작해주는 tool
- `--save-dev`로 설치된 모듈은 로컬에서만 실행

```bash
npm install nodemon --save-dev
```

- 시작할 때 nodemon으로 시작하려면 package에서 script를 추가해줘야한다.

```json
{
  ...,
  "scripts": {
    ...,
    "devStart": "nodemon index.js",
  },
  ...
}
```
