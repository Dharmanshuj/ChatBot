require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Endpoint to interact with the Gemini fine-tuned model
app.post('/api/chatbot', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}`,  // Append key here
            { contents: [{ parts: [{ text: message }] }] },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("Gemini API Response:", response.data);

        // Parse response from Gemini
        const botResponse =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received from model.';
        res.json({ botResponse });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
