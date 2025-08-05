
// Importing necessary hooks and libraries
import { useState } from 'react';
import axios from 'axios';
import api from '../services/api'; // Custom Axios instance (baseURL configured)
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../store/Context';

function AddCSV() {
  // State to store selected file and feedback message
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const { role } = useMyContext();

  const navigate = useNavigate();

  // Function to upload the selected file to the backend
  const uploadFile = async () => {
    const formData = new FormData(); // Used to send files in multipart/form-data format
    formData.append('file', file); // Appending the selected file

    try {
      // Sending POST request to the backend
      const res = await api.post('/csv/upload-tasks', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Display success message and navigate to view page
      setMessage(res.data.message);
      (role === 'admin') ? navigate('/dashboard/view') : navigate('/agent-dashboard/add-csv');
    } catch (err) {
      // Handle error and display error message
      console.log(err);
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md flex flex-col items-center gap-4 mt-10">
      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800">Upload your CSV file</h2>

      {/* File input field */}
      <input
        type="file"
        accept=".csv,.xlsx,.xls" // Accept CSV and Excel file formats
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full 
        file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer"
      />

      {/* Upload button */}
      <button
        onClick={uploadFile}
        className="w-full bg-blue-600 hover:bg-blue-600 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        Upload
      </button>

      {/* Success or error message */}
      {message && (
        <p className="text-lg text-green-600 font-medium text-center">{message}</p>
      )}
    </div>
  );
}

export default AddCSV;
