const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneno: { type: Number, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Agent', agentSchema);
