const express = require('express');
const router = express.Router();

// import of modular route for /notes
const notesRouter = require('./notes.js');

// middleware function
router.use('/notes', notesRouter);

module.exports = router;