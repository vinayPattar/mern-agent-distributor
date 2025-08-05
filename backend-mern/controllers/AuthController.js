const User = require('../models/user');
const Agent = require('../models/agent');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let foundUser = await User.findOne({ email });
    let role = 'admin';

    if (!foundUser) {
      foundUser = await Agent.findOne({ email });
      role = 'agent';
    }

    if (!foundUser) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: foundUser._id,
        email: foundUser.email,
        role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
