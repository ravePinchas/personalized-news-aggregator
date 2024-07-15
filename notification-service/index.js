const express = require('express');
const app = express();
const notificationRoutes = require('./routes/notification-route'); // Import user route handlers

app.use(express.json());
const PORT = process.env.PORT || 3002;


app.use('/email', notificationRoutes);


app.listen(PORT, () => {
    console.log(`Notification Service is running on port ${PORT}`);
});
