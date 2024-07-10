// user-service/index.js
const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Import user route handlers
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

        // Routes
// app.get('/users', async (req, res) => {
//     try {
//         const users = await db.collection('users').find().toArray();
//         res.json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ error: 'Error fetching users' });
//     }
// });

// Routes

app.use('/', userRoutes)

app.use('/', userRoutes); // Mount user routes under /user

// Start the server
app.listen(PORT, () => {
    console.log(`User Service is running on port ${PORT}`);
});
