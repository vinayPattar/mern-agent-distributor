
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const csv = require('csvtojson');
const xlsx = require('xlsx');
const fs = require('fs');
const Task = require('../models/Task');
const Agent = require('../models/agent'); 

router.post('/upload-tasks', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext = filePath.split('.').pop();
    let items = [];

    if (ext === 'csv') {
      items = await csv().fromFile(filePath);
    } else {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      items = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    }

    if (!items.length) return res.status(400).json({ message: 'Empty file' });

    const agents = await Agent.find().limit(5);
    if (!agents.length) return res.status(400).json({ message: 'No agents found' });

    // Distribute items among agents
    const tasks = [];
    for (let i = 0; i < items.length; i++) {
      const agentIndex = i % agents.length;
      tasks.push({
        firstName: items[i].FirstName,
        phone: items[i].Phone,
        notes: items[i].Notes,
        agentId: agents[agentIndex]._id,
      });
    }

    await Task.insertMany(tasks);
    fs.unlinkSync(filePath); // clean up

    res.status(200).json({ message: 'Tasks uploaded and assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
