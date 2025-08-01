# Task Distribution API

This Node.js + Express.js app handles uploading of CSV/XLS/XLSX files containing task data, distributes them equally among 5 agents, stores them in MongoDB, and provides a simple endpoint to upload files.

---

## # 📁 Project Structure

```
.
├── middleware/
│   └── upload.js           # Handles file upload using Multer
├── models/
│   ├── agent.js            # Mongoose model for Agent
│   └── task.js             # Mongoose model for Task
├── routes/
│   └── taskRoutes.js       # File upload route logic
├── uploads/                # Temporarily stores uploaded files
├── .env                    # Environment variables (Mongo URI, Port, etc.)
├── index.js                # App entry point
└── README.md               # Project documentation
```

## 🛠️ Setup Instructions

1. **Clone the Repository**

## Install dependencies
npm install
## Set up your .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/task_distribution

## Start by adding the admin (Adding the default admin )
nodemon seed.js

##  API Endpoint
POST /api/tasks/upload-tasks
Description:
Uploads a CSV/XLS/XLSX file and distributes the data among 5 agents in a round-robin fashion.

Headers:
Content-Type: multipart/form-data

Form-data:
file: Your CSV/XLSX file.

## Features
Accepts .csv, .xlsx, and .xls files

Parses and normalizes fields (FirstName, Phone, Notes)

Assigns each task to one of 5 agents in round-robin

Saves all tasks to MongoDB

Deletes uploaded file after processing

##  Tech Stack
Node.js

Express.js

MongoDB + Mongoose

Multer (for file upload)

csvtojson & xlsx (for file parsing

git clone <your_repo_url>
cd <your_repo_folder>
