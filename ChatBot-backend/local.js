require('dotenv').config();
const express = require('./index').app; // Import the Express app from your serverless function

const PORT = process.env.PORT || 5000;

express.listen(PORT, () => {
    console.log(`Server running locally at http://localhost:${PORT}`);
});