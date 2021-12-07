const express = require('express');
const app = express();
const port = 5000;
const config = require('./config/key');
const { User } = require('./models/User');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
      userInfo.generateToken((error, userInfo) => {});
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
