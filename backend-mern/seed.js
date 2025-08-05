const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/agent-dashboard');

const run = async () => {
  const hashed = await bcrypt.hash('admin123', 10);
  await User.create({ email: 'admin@example.com', password: hashed });
  console.log('Admin user created');
  mongoose.disconnect();
};

run();
