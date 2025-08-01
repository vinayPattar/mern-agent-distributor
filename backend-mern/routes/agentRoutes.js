const express = require('express');
const router = express.Router();

// Importing controller function to add a new agent
const { addAgent } = require('../controllers/agentController');

// Importing Mongoose models
const Task = require('../models/Task');
const Agent = require('../models/agent');

// Route to add a new agent
// POST /add-agent
router.post('/add-agent', addAgent);

// Route to get all agents along with their assigned tasks
// GET /agents-with-tasks
router.get('/agents-with-tasks', async (req, res) => {
  try {
    // Fetch all agents from the database
    const agents = await Agent.find();

    // For each agent, fetch the tasks assigned to them
    const results = await Promise.all(
      agents.map(async (agent) => {
        const tasks = await Task.find({ agentId: agent._id });

        // Return structured data containing agent info and their tasks
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

    // Send the structured agent-task list as a response
    res.json(results);
  } catch (err) {
    console.error('Error fetching agent tasks:', err);
    res.status(500).json({ message: 'Error fetching agent tasks' });
  }
});

// Export the router to be used in the main app
module.exports = router;
