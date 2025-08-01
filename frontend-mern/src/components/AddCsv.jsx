// components/FileUpload.jsx
import { useState } from 'react';
import axios from 'axios';
import api from '../services/api'
function AddCSV() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await api.post('/csv/upload-tasks', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message);
    } catch (err) {
      console.log(err)
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-md flex flex-col items-center gap-4 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800">Upload your CSV file</h2>

      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full 
        file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer"
      />

      <button
        onClick={uploadFile}
        className="w-full bg-blue-600 hover:bg-blue-600 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        Upload
      </button>

      {message && (
        <p className="text-lg text-red-600 font-medium text-center">{message}</p>
      )}
    </div>

  );
}

export default AddCSV;
