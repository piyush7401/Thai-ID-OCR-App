import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';


const OcrContext = createContext();

export const useOcrContext = () => useContext(OcrContext);

export const OcrProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [ocrData, setOcrData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('idCardImage', file);
  
      const response = await axios.post('http://localhost:8000/api/ocr/create', formData);
  
      console.log('OCR Result:', response.data.ocrData);
    } catch (error) {
      console.error('Upload and OCR Error:', error.message);
    }
  };
  

  const contextValue = {
    file,
    setFile,
    ocrData,
    error,
    handleFileChange,
    handleUpload,
  };

  return <OcrContext.Provider value={contextValue}>{children}</OcrContext.Provider>;
};