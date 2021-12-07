const express = require('express');
const app = express();
const port = 5000;
const cookieParser = require('cookie-parser');
const config = require('./config/key');
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

app.post('/register', (req, res) => {
  // 회원가입할때 필요한 정보들을 Client에서 가져와서 데이터베이스에 넣어준다.
  const user = new User(req.body);

  user.save((error, userInfo) => {
    if (error) return res.json({ success: false, error });
    return res.status(200).json({ success: true });
  });
});

app.post('/login', (req, res) => {
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
