// dependencies
const notes = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');

// GET request to view list already existing notes
notes.get('/', (request, response) => {
  // Log that a GET request was received
  console.info(`${request.method} request received for notes`);

  fs.readFile('./db/db.json', (error, data) =>
    error ? console.error(error) : response.json(JSON.parse(data))
  );
});

// POST Route for submitting new note
notes.post('/', (request, response) => {
  // Log that a POST request was received
  console.info(`${request.method} request received to submit new note`);

  // Destructuring assignment for the items in req.body
  const { title, text, } = request.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object to be saved
    const newNote = {
      title,
      text,
      id: uniqid(),
    };

    // get existing notes
    fs.readFile('./db/db.json', 'utf8', (error, data) => {
      if (error) {
        console.error(error);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated Notes back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated Notes!')
        );
      }
    });

    const noteResponse = {
      status: 'success',
      body: newNote,
    };

    console.log(noteResponse);
    response.status(201).json(noteResponse);
  } else {
    response.status(500).json('Error in posting new note');
  }
});

notes.delete('/:id', (request, response) => {
  console.info(`${request.method} request received`);
  
  // read the file as it exists 
  fs.readFile('./db/db.json', 'utf8', (error, data) => {
    if (error) {
      console.error(error);
    } else {
      // Convert string into JSON object
      let notesDB = JSON.parse(data);
      let newDB = [];
      const noteID = request.params.id;

      // iterate over object to filter out the note that matches the request parameter id
      for (let i = 0; i < notesDB.length; i++) {
        const currentNote = notesDB[i];
        if (currentNote.id !== noteID) {
          // push the remaining notes to a new db file to rewrite the file
          newDB.push(currentNote);
          fs.writeFile('./db/db.json', JSON.stringify(newDB, null, 3),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully deleted note!')
          );
        }
      }
    }
  });
  fs.readFile('./db/db.json', (error, data) =>
    error ? console.error(error) : response.json(JSON.parse(data))
  );
});

module.exports = notes;