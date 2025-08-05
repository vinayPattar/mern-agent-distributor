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
// Route to handle task file upload and assignment to agents
// Route to handle task file upload and assignment to agents
router.post('/upload-tasks', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext = filePath.split('.').pop();
    let items = [];

    // Parse CSV or Excel
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

    // 🚨 Remove duplicates inside the uploaded file (by phone)
    const seenPhones = new Set();
    const deduplicatedItems = items.filter(item => {
      if (!item.phone || seenPhones.has(item.phone)) return false;
      seenPhones.add(item.phone);
      return true;
    });

    const agents = await Agent.find();
    if (!agents.length) return res.status(400).json({ message: 'No agents found' });

    // 📦 Check against DB for already existing phone numbers
    const existingPhones = new Set(
      (await Task.find({ phone: { $in: deduplicatedItems.map(i => i.phone) } }, { phone: 1 }))
        .map(task => task.phone)
    );

    // ✅ Only keep tasks that are not already in DB
    const uniqueItems = deduplicatedItems.filter(item => !existingPhones.has(item.phone));

    if (!uniqueItems.length) {
      fs.unlinkSync(filePath);
      return res.status(400).json({ message: 'These tasks are already added or duplicate within file' });
    }

    // ✅ Dynamically distribute tasks round-robin to all agents (not just 5)
    const tasks = uniqueItems.map((item, index) => ({
      firstName: item.firstName,
      phone: item.phone,
      notes: item.notes,
      agentId: agents[index % agents.length]._id, // 🔥 the only line changed
    }));

    await Task.insertMany(tasks);
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: `${tasks.length} tasks uploaded and assigned successfully`,
      duplicatesSkipped: items.length - uniqueItems.length,
      fileDuplicatesRemoved: items.length - deduplicatedItems.length,
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router; // Export the router
