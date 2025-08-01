const express = require('express');
const router = express.Router();
const { addAgent } = require('../controllers/agentController');
const Task = require('../models/Task');
const Agent = require('../models/agent');


router.post('/add-agent', addAgent);
// Get all agents with their tasks
router.get('/agents-with-tasks', async (req, res) => {
  try {
    const agents = await Agent.find();

    const results = await Promise.all(
      agents.map(async (agent) => {
        const tasks = await Task.find({ agentId: agent._id });
        return {
          agent: {
            id: agent._id,
            name: agent.name,
            email: agent.email,
          },
          tasks,
        };
      })
    );

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching agent tasks' });
  }
});



module.exports = router;
