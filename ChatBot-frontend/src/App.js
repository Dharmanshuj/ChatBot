import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './LoginSignup/LoginSignup';
import HomePage from './HomePage/HomePage';
import './App.css';

const App = () => {
  useEffect(() => {
    // Wait for iframe to load before accessing content
    const iframe = document.querySelector('iframe');

    const handleIframeLoad = () => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      iframeDoc.documentElement.style.overflow = 'hidden'; // hides scroll
      iframeDoc.body.style.overflow = 'hidden'; // hides scroll
      iframe.style.pointerEvents = 'none';
    };

    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);  // Attach event listener
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []); // Empty dependency array, effect runs once after component mounts

  return (
    <div>
      <iframe 
        src='/particles.js-master/demo/index.html'
        className='background'
        title='Background'
      />
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
