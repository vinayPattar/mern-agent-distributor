const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (['.csv', '.xlsx', '.xls'].includes(ext)) cb(null, true);
  else cb(new Error('Only .csv, .xlsx, .xls files are allowed'), false);
};

module.exports = multer({ storage, fileFilter });
