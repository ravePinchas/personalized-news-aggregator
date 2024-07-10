const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
    res.send('Notification Service');
});

app.listen(PORT, () => {
    console.log(`Notification Service is running on port ${PORT}`);
});
