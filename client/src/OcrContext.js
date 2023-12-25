import React, { createContext, useContext, useState } from 'react';

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
    setError(null);
    setOcrData(null);

    const formData = new FormData();
    formData.append('idCardImage', file);

    try {
      // Replace the API URL with your actual backend URL
      const response = await fetch('http://localhost:8000/api/ocr/create', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      setOcrData(result);
    } catch (err) {
      setError('Error uploading the file');
      console.error(err);
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
