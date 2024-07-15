const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Import user route handlers
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

// Dapr middleware
const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || 3500;
const DAPR_STATE_STORE_NAME = process.env.DAPR_STATE_STORE_NAME || 'statestore';

// Dapr state store name
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`User Service is running on port ${PORT}`);
});
