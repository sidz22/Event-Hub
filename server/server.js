const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routes/api');
const app = express();
app.use(express.json()); // necessary to parse JSON request body
app.use(cors())

app.use(bodyParser.json()); 

app.use('/api', api);

// 👇 This is the key part
app.use(express.static(path.join(__dirname, '../dist/event/browser')));

// 👇 For Angular routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/event/browser/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

