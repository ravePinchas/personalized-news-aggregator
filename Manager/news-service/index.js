const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('News Service');
});

app.listen(PORT, () => {
    console.log(`News Service is running on port ${PORT}`);
});
