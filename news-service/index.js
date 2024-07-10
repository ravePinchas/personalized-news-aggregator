// news-service/index.js
const express = require('express');
const newsRoutes = require('./routes/newsRoutes'); // Import news route handlers
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(express.json());

// Routes
app.use('/news', newsRoutes); // Mount news routes under /news

// Start the server
app.listen(PORT, () => {
    console.log(`News Service is running on port ${PORT}`);
});
