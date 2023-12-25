import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [file, setFile] = useState(null);
  const [ocrData, setOcrData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setError(null);
    setOcrData(null);

    const formData = new FormData();
    formData.append('idCardImage', file);

    try {
      const response = await axios.post('http://localhost:8000/api/ocr/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setOcrData(response.data);
    } catch (err) {
      setError('Error uploading the file');
      console.error(err);
    }
  };

  return (
    <div  style={{ textAlign: 'center', margin: '20px' }}>
      <h1>OCR Frontend</h1>

      <div style={{ margin: '10px' }}>
        <label htmlFor="file">Select a Thai ID Card Image:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>

      <button
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }} 
      onClick={handleUpload}>Upload and Process</button>

      {ocrData && (
        <div style={{ margin: '20px' }}>
          <h2>OCR Result:</h2>
          <pre style={{ textAlign: 'left', background: '#f8f8f8', padding: '10px', borderRadius: '5px' }}>{JSON.stringify(ocrData, null, 2)}</pre>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
