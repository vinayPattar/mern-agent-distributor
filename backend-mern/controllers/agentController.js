const Agent = require('../models/agent');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

exports.addAgent = async (req, res) => {
  const { name, email, phoneno, password } = req.body;

  try {

    const user = await Agent.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Agent Already exists!" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new agent with the hash password
    const newAgent = new Agent({
      name,
      email,
      phoneno,
      password: hashedPassword,
      role: 'agent',
    });

    // Save agent
    await newAgent.save();

    res.status(201).json({ message: 'Agent added successfully', agent: newAgent });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
