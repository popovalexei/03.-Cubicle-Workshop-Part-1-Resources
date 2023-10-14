const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minLength: [5, 'Username should be at least 5 characters'],
    match: [
      /^[A-Za-z0-9]+$/,
      'Username is not with English letters and digits only',
    ],
    unique: {
      value: true,
      message: 'Username already exists',
    },
  },
  password: {
    type: String,
    minLength: [8, 'Password is too short'],
    validate: function (value) {
      return /^[A-Za-z0-9]+$/.test(value);
    },
    message: 'Invalid characters.',
  },
});

userSchema.path('username').validate(function (username) {
  const user = mongoose.model('User').findOne({ username });
  return !!user;
}, 'Username already exists');

//TODO: If the user already exists, throw error
userSchema.virtual('repeatPassword').set(function (value) {
  if (value !== this.password) {
    throw new Error('Password miss match!');
  }
});

// Before saving the user, we hash the password
userSchema.pre('save', async function () {
  //                              word,         salt rounds
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
