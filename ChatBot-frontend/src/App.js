import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './LoginSignup/LoginSignup';
import HomePage from './HomePage/HomePage';
import './App.css';

const App = () => {
    return (
        <div className='h-auto w-full overflow-hidden container'>
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
