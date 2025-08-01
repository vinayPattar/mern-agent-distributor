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
    <div className="p-4">
      <input type="file" accept=".csv,.xlsx,.xls" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile} className="btn btn-primary ml-2">Upload</button>
      <p>{message}</p>
    </div>
  );
}

export default AddCSV;
