const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routes/api');
const app = express();
app.use(express.json()); // necessary to parse JSON request body
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); 

app.use('/api', api);

// 👇 This is the key part
app.use(express.static(path.join(__dirname, '../dist/event/browser')));

app.get('/test.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/event/browser/index.html'));
});

// Optional: Example API  
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// 👇 For Angular routing
app.get('*', (req, res) => {
  console.log("Wildcard route called for:", req.url);
  res.sendFile(path.join(__dirname, '../dist/event/browser/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

