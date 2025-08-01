const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Multer middleware for handling file uploads
const csv = require('csvtojson'); // Library to convert CSV to JSON
const xlsx = require('xlsx'); // Library to read Excel files
const fs = require('fs'); // Node.js file system module
const Task = require('../models/Task'); // Mongoose model for tasks
const Agent = require('../models/agent'); // Mongoose model for agents

// Helper function to normalize keys and extract only necessary fields from each row
const normalizeRow = (row) => {
  const normalized = {};
  Object.keys(row).forEach((key) => {
    normalized[key.trim().toLowerCase()] = row[key]; // Normalize keys by trimming and converting to lowercase
  });
  return {
    firstName: normalized['firstname'] || normalized['name'] || '', // Accept 'firstname' or 'name'
    phone: normalized['phone'] || normalized['phone'] || '', // Accept 'phonenumber' or 'phone'
    notes: normalized['note'] || normalized['notes'] || '', // Accept 'note' or 'notes'
  };
};

// Route to handle task file upload and assignment to agents
router.post('/upload-tasks', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path; // Get uploaded file path
    const ext = filePath.split('.').pop(); // Get file extension
    let items = [];

    // Parse based on file extension (CSV or Excel)
    if (ext === 'csv') {
      const rawItems = await csv().fromFile(filePath); // Convert CSV to JSON
      items = rawItems.map(normalizeRow); // Normalize each row
    } else {
      const workbook = xlsx.readFile(filePath); // Read Excel file
      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const rawItems = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert sheet to JSON
      items = rawItems.map(normalizeRow); // Normalize each row
    }

    if (!items.length) return res.status(400).json({ message: 'Empty file' }); // No data found in file

    const agents = await Agent.find().limit(5); // Get up to 5 agents from DB
    if (!agents.length) return res.status(400).json({ message: 'No agents found' }); // No agents in DB

    const tasks = [];
    // Distribute tasks in a round-robin fashion among the agents
    for (let i = 0; i < items.length; i++) {
      const agentIndex = i % agents.length;
      tasks.push({
        firstName: items[i].firstName,
        phone: items[i].phone,
        notes: items[i].notes,
        agentId: agents[agentIndex]._id, // Assign task to agent
      });
    }

    await Task.insertMany(tasks); // Bulk insert tasks into DB
    fs.unlinkSync(filePath); // Delete the uploaded file after processing

    res.status(200).json({ message: 'Tasks uploaded and assigned successfully' }); // Success response
  } catch (err) {
    console.error('Upload Error:', err); // Log any error
    res.status(500).json({ message: 'Server error' }); // Server error response
  }
});

module.exports = router; // Export the router
