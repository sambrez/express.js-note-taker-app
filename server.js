// dependencies
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);


// static middleware points to public folder
app.use(express.static('public'));

// GET route for landing page
app.get('/', (request, response) =>
  response.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes page
app.get('/notes', (request, response) =>
  response.sendFile(path.join(__dirname, '/public/notes.html'))
);

// listens for connections on specified port
app.listen(PORT, () =>
  console.log(`Note Taker app listening at http://localhost:${PORT}`)
);