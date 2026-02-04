const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Serve static files (optional but good practice if index.html links to other things)
app.use(express.static(path.join(__dirname, '../')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
