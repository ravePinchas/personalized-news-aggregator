const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Import user route handlers
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`User Service is running on port ${PORT}`);
});
