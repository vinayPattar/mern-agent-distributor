const mongoose = require('mongoose');

// Create a mongoose schema (model) for the User
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
});

module.exports = mongoose.model('User', userSchema);
