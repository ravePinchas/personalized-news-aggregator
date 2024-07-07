const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

app.post('/fetch-news', async (req, res) => {
  const { preferences } = req.body;

  // Fetch news based on user preferences
  const newsResponse = await axios.get(`https://newsdata.io/api/1/news?apikey=your_api_key&category=${preferences}`);
  const news = newsResponse.data.results;

  res.json(news);
});

app.listen(3001, () => {
  console.log('News Service running on port 3001');
});
