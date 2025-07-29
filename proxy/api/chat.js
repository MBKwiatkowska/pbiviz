// Vercel serverless function – obsługuje zapytanie do Claude API
const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests allowed');
    return;
  }

  const { apiKey, prompt, model } = req.body;

  try {
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: model || 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
