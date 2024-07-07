const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'your_secret_key';

mongoose.connect('mongodb://user-db:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  id: String,
  username: { type: String, unique: true },
  password: String,
  preferences: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  const user = new User({ id, username, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/preferences', async (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { preferences } = req.body;

    await User.updateOne({ id: decoded.id }, { preferences });
    res.json({ message: 'Preferences updated successfully' });
  } catch (err) {
    res.status(403).json({ message: 'Token is invalid' });
  }
});

app.listen(3000, () => {
  console.log('User Service running on port 3000');
});
