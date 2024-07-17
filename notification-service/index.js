const express = require('express');
const notificationRoutes = require('./routes/notification-route'); 
const { startConsumer } = require('./handlers/notification-handler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(require('body-parser').json());

// Start the consumer
startConsumer();

// Routes
app.use('/', notificationRoutes);

app.listen(PORT, () => {
    console.log(`Notification Service is running on port ${PORT}`);
});
