const mongoose = require('mongoose');

// Create a mongoose schema (model) for the Agent
const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneno: { type: String, required: true },
  password: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);
