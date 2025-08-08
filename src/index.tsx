import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Debug environment variables
console.log('🔍 Environment Variables Check:');
console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
console.log('Supabase Key exists:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
console.log('API URL:', process.env.REACT_APP_API_URL);

// Error boundary component
const ErrorBoundary = ({ children }) => {
  try {
    return children;
  } catch (error) {
    console.error('🚨 App Initialization Error:', error);
    return (
      <div style={{ padding: '20px', color: 'red', fontFamily: 'Arial' }}>
        <h2>BloodWise App Error</h2>
        <p>Error: {error.message}</p>
        <p>Check console for details</p>
      </div>
    );
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
