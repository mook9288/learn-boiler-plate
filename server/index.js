const express = require('express');
const app = express();
const port = 5000;
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((error) => console.log('config', config.mongoURI));

app.get('/', (req, res) => res.send('Hello World! 안녕?!!!'));

app.get('/api/hello', (req, res) => {
  res.send('안녕하세요!!!!!');
});

app.post('/api/users/register', (req, res) => {
  // 회원가입할때 필요한 정보들을 Client에서 가져와서 데이터베이스에 넣어준다.
  const user = new User(req.body);

  user.save((error, userInfo) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).json({ success: true });
  });
});

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 존재하는지 확인
  User.findOne({ email: req.body.email }, (error, userInfo) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }
    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 서로 같은지 확인
    userInfo.comparePassword(req.body.password, (error, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      }

      // 비밀번호까지 맞다면 Token 생성
      userInfo.generateToken((error, userInfo) => {
        if (error) return res.status(400).send(error);
        // token 저장. 로컬스토리지/쿠키 등
        // 이 강의에서는 쿠키에 저장
        res.cookie('x_auth', userInfo.token).status(200).json({
          loginSuccess: true,
          userId: userInfo._id,
        });
      });
    });
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  // auth라는 middleware를 추가해준다.
  // middleware? endpoint의 request를 받은 다음 callback()을 하기 전에 무언가 실행하는 것

  // 여기까지 미들웨어를 통과했다는 얘기는 Authentication 이 true라는 말
  res.status(200).json({
    _id: req.user._id,
    // role 1 -  어드민, role 2 - 특정부서 어드민, role 0 - 일반유저, role 0 이 아니면 관리자
    isAdmin: req.user.rele === 0 ? false : true,
    isAuth: true,
    email: res.user.email,
    name: res.user.name,
    lastname: res.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (error, user) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).send({ success: true });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
