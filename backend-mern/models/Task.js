
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  agentId: mongoose.Schema.Types.ObjectId, 
});

module.exports = mongoose.model('Task', taskSchema);
