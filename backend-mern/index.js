const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/db');

dotenv.config();
connectDB();



const app = express();
// app.use(cors());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true
}));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/agent', require('./routes/agentRoutes'));
app.use('/api/csv', require('./routes/uploadRoutes'));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
