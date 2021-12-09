const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // space를 없애주는 역할
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 100,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    // 비밀번호를 암호화 시킴
    bcrypt.genSalt(saltRounds, function (error, salt) {
      if (error) return next(error);
      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) return next(error);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  // plainPassword와 암호화된 비밀번호가 같은지 확인
  // plainPassword도 암호화한 후 비교
  bcrypt.compare(plainPassword, this.password, function (error, isMatch) {
    if (error) return callback(error);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  var user = this;
  // jsonwebtoken을 이용하여 token 생성
  // var token = jwt.sign(user._id, 'secretToken');
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  // user._id + 'secretToken' = token
  // ->>> 'secretToken' -> user._id
  user.token = token;
  user.save(function (error, user) {
    if (error) return callback(error);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  var user = this;

  // user._id + '' = token // 'secretToken'
  // 복호화 하는 과정
  // token을 decode 한다
  jwt.verify(token, 'secretToken', function (error, decoded) {
    // decoded = user id
    // userId를 이용해서 user를 찾은 다음
    // Client에서 가져온 token과 DB에 보관된 token이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (error, user) {
      if (error) return callback(error);
      callback(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
