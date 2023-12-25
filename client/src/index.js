import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { OcrProvider } from './OcrContext';

ReactDOM.render(
  <React.StrictMode>
    <OcrProvider>
      <App />
    </OcrProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
