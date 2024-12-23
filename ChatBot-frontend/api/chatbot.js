// api/chatbot.js
const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' }); // Only allow POST
  }

  const { message } = req.body;

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}`,
      { contents: [{ parts: [{ text: message }] }] },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const botResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received from model.';

    res.status(200).json({ botResponse });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to process the request.' });
  }
};