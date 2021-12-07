const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

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
    maxlength: 5,
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
    if (error) return callback(error), callback(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
