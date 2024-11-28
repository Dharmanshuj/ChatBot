require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//     res.json("Hello");
// });

// Endpoint to interact with the Gemini fine-tuned model
app.post('/index', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}`,
            { contents: [{ parts: [{ text: message }] }] },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("Gemini API Response:", response.data);

        const botResponse =
            response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received from model.';
        res.json({ botResponse });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Export based on environment
if (process.env.IS_SERVERLESS) {
    module.exports = serverless(app); // Default export for serverless deployment
} else {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
