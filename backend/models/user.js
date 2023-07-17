const validator = require('validator');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'This field cannot be empty'],
  },
  email: {
    type: String,
    required: [true, 'This field cannot be empty'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Enter Email',
    },
  },
  password: {
    type: String,
    required: [true, 'This field cannot be empty'],
    select: false,
  },
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
