const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  privileges: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', userSchema);