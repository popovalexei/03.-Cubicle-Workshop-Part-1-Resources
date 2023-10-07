const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

//TODO: If the user already exists, throw error
userSchema.virtual('repeatPassword').set(function (value) {
  if (value !== this.password) {
    throw new mongoose.MongooseError('Password miss match!');
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
