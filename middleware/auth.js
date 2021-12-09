const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 인증 처리 하는 곳

  // Client Cookie에서 token을 가져온다
  let token = req.cookies.x_auth;

  // token을 복호화한 후 유저를 찾는다.
  User.findByToken(token, (error, user) => {
    if (error) throw error;
    if (!user) return res.json({ isAuth: false, error: true });

    // 토큰에 유저를 리퀘스트로 넣어줌으로써 사용할 수 있에 정보를 넣어줌
    req.token = token;
    req.user = user;
    next(); // 미들웨어에서 다음으로 갈 수 있도록
  });

  // 유저가 있으면 인증 Okay

  // 유저가 없으면 인증 No
};

module.exports = { auth };
