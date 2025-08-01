const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const csv = require('csvtojson');
const xlsx = require('xlsx');
const fs = require('fs');
const Task = require('../models/Task');
const Agent = require('../models/agent');

const normalizeRow = (row) => {
  const normalized = {};
  Object.keys(row).forEach((key) => {
    normalized[key.trim().toLowerCase()] = row[key];
  });
  return {
    firstName: normalized['firstname'] || normalized['name'] || '',
    phone: normalized['phone'] || '',
    notes: normalized['notes'] || '',
  };
};

router.post('/upload-tasks', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext = filePath.split('.').pop();
    let items = [];

    if (ext === 'csv') {
      const rawItems = await csv().fromFile(filePath);
      items = rawItems.map(normalizeRow);
    } else {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const rawItems = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      items = rawItems.map(normalizeRow);
    }

    if (!items.length) return res.status(400).json({ message: 'Empty file' });

    const agents = await Agent.find().limit(5);
    if (!agents.length) return res.status(400).json({ message: 'No agents found' });

    const tasks = [];
    for (let i = 0; i < items.length; i++) {
      const agentIndex = i % agents.length;
      tasks.push({
        firstName: items[i].firstName,
        phone: items[i].phone,
        notes: items[i].notes,
        agentId: agents[agentIndex]._id,
      });
    }

    await Task.insertMany(tasks);
    fs.unlinkSync(filePath); 

    res.status(200).json({ message: 'Tasks uploaded and assigned successfully' });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
