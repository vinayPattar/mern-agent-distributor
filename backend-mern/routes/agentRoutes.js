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
    res.json(results).status(200);
  } catch (err) {
    console.error('Error fetching agent tasks:', err);
    res.status(500).json({ message: 'Error fetching agent tasks' });
  }
});

router.get('/agent-tasks', async (req, res) => {
  const { email } = req.query;

  try {
    // Find agent by email
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.status(404).json({ message: 'Agent Not Found' });
    }

    // Find tasks assigned to the agent
    const tasks = await Task.find({ agentId: agent._id });

    res.status(200).json({
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
      },
      tasks,
    });
  } catch (err) {
    console.error('Error fetching tasks for agent:', err);
    res.status(500).json({ message: err });
  }
});

router.get('/agent-info', async (req, res) => {
  const { email } = req.query;
  try {

    const agent = await Agent.findOne({ email });

    if (!agent) {
      res.status(404).json({ message: "Agent Not found" });

    }

    res.json({
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        phoneno: agent.phoneno,
      }

    }).status(200);

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.put('/update', async (req, res) => {
  const { email } = req.query;
  const { name, phoneno } = req.body;

  try {
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Update the fields
    agent.name = name;
    agent.phoneno = phoneno;

    await agent.save();

    return res.status(200).json({ message: "Details updated successfully" });

  } catch (err) {
    console.error("Error updating agent:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete('/delete-agent', async (req, res) => {
  const { email } = req.query;

  try {
    const agent = await Agent.findOne({ email });

    if (!agent) {
      res.status(404).json({ message: "Agent not found" });
    }

    await agent.deleteOne({ agent })

    res.json({ message: "Agent deleted successfully" })

  } catch (errr) {
    console.log(errr)
    res.json(errr)
  }
})

// Export the router to be used in the main app
module.exports = router;
