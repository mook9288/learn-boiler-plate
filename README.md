# 인프런강의 따라하기

- [따라하며 배우는 노드, 리액트 시리즈 - 기본 강의](https://inf.run/MBce)

## NodeJS 기초

### node js

### express js

```bash
npm install express --save
```

### mongoDB

```bash
npm install mongoose --save
```

```js
const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://mook:test1234@inflearn01.r9udb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    // mongoose의 버전이 6 이상부터는 아래 코드 오류!!!
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopologe: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.log(error));
```

### bodyParser

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
app.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save(); // mongoDB에서 오는 메소드,
});
```

- express 4.x버전부터는 express에 bodyParser가 내장된다.

```js
const express = require('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```

### postman에서 POST 결과 확인하기

![postman에서 POST 결과 확인하기](./images/07.postman_success.png)

### nodemon

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

### 소스코드 안의 비밀 정보 보호

- mongoDB의 userID와 password가 공개되므로 남들이 사용하지 못하도록 숨겨야한다. `.gitignore`파일에 비밀 정보가 들어 있는 파일을 담아준다.
- 개발환경이 로컬인지 아니면 배포모드인지에 따라 다르게 설정해줘야한다. 이때, 환경변수를 이용하여 개발(development)/배포(production)모드를 구분해주면 된다.

> **[참고] Heroku 사용하기** \
> \- [Heroku로 간단하게 웹 사이트 배포하기](https://velog.io/@ansfls/Heroku로-간단하게-웹-사이트-배포하기) \
> \- [JohnAhn Heroku 서비스를 이용하여 MERN 스택 앱을 배포하기](https://youtu.be/qdoiwouykAg)

### Bcrypt을 이용한 비밀번호 암호화

- 현재 데이터베이스에 저장된 비밀번호를 보면 안전하지 않다.
- 비밀번호를 암호화(난수화, 익명화) 해줘서 데이터 베이스에 저장해주는 것이 좋다. 데이터 위조 방지

```bash
npm install bcrypt --save
```

#### Bcrypt로 비밀번호 암호화 하는 순서

1. 먼저 Register Route로 가기
2. 유저 정보들(Account, Password 등등)을 데이터베이스에 저장하기 전, 암호화할 타이밍 \
  \- mongoose의 기능을 사용. `pre('save', func)`: 저장하기 전에 func 실행
```js
// User.js
userSchema.pre("save", function (next) { ... }
// next => index.js의 app.post("/register", (...) => { ... user.save() }) 부분
```

  \- Salt 자리수(?)를 나타내는 `saltRounds`를 지정 \
  \- Salt를 먼저 생성한 후, Salt를 이용하여(`bcrypt.genSalt(자리수, func(error, salt){...})))`) 비밀번호를 암호화 해야한다. \
  \- salt를 제대로 생성을 했으면
```js
bcrypt.hash(실제 입력한 비밀번호, salt, func(error, 암호화된 비밀번호){...})
```

3. 비밀번호를 변경할 때만 암호화하기 위해 조건 추가
```js
if (user.isModified('password')) { ... }
```

### 로그인 기능 만들기

#### login route 만들기

1. 데이터베이스에서 요청한 E-mail 찾기 \
  \- mongoose에서 제공하는 메서드 이용, `findOne(conditions, callback)`

2. 데이터베이스에서 요청한 E-mail이 있다면 비밀번호가 같은지 확인 \
  \- Bcrypt 이용, plain password와 암호화된 패스워드 비교 \
  \- models/User.js 에서 패스워드 비교 메소드 생성 `userSchema.methods.comparePassword()` \
  \- 입력 받은 비밀번호를 암호화 시킨 후, 데이터베이스에 저장된 암호화된 비밀번호와 비교해야한다. 동일한 조건에서 대상을 비교해야한다. 이떄, 입력 받은 비밀번호를 암호화시키려면 `bcrypt.compare(입력받은값, 데이터베이스값, callback)`를 이용하면 된다.

3. 비밀번호까지 같다면 Token 생성 \
  \- `npm install jsonwebtoken --save` jsonwebtoken 패키지 이용
  \- models/User.js 에서 패스워드 비교 메소드 생성 `userSchema.methods.generateToken()`
```js
const jwt = require('jsonwebtoken');
const token = jwt.sign({foo, bar}, 'ahhhh');
```

4. 생성된 Token 저장 \
  \- 로컬스토리지, 세션, 쿠키 등의 공간에 저장이 가능하다. \
  \- 이 강의에서는 쿠키에 저장함

```bash
npm install cookie-parser --save
```
