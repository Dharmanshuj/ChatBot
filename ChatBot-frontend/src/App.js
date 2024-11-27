import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './LoginSignup/LoginSignup';
import HomePage from './HomePage/HomePage';
import './App.css';

const iframe = document.querySelector('iframe');
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
iframeDoc.documentElement.style.overflow = 'hidden'; // hides scroll
iframeDoc.body.style.overflow = 'hidden'; // hides scroll
iframe.style.pointerEvents = 'none';

const App = () => {
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
}

export default App;
