// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData);
      setFileData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <h1>File Metadata Microservice</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {fileData && (
        <div>
          <h2>File Information:</h2>
          <p>Original Name: {fileData.originalname}</p>
          <p>MIME Type: {fileData.mimetype}</p>
          <p>Size: {fileData.size} bytes</p>
        </div>
      )}
    </div>
  );
}

export default App;

