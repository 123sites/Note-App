const router = require ('express').Router();
const fs = require ('fs');

// GET request for notes
router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data);
      res.json(parsedNotes);
    }
  });
})

// / POST request to add a note
router.post('/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { note } = req.body;  

  // If all the required properties are present
  if (note) {
    // Variable for the object we will save
    const newNote = {
      note
    };


    // Reads the db.json file and return all saved notes as JSON.
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      console.log('Getting notes'); 
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        let parsedNotes = JSON.parse(data); 

        // Add a new note
        // let newNote = req.body;
        parsedNotes.push(newNote); 

        // Write updated notes back to the file
        fs.writeFile(
          './db/notes', 
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr) 
              : console.info('Successfully updated notes!')
        );
      }
 

    const response = { 
      status: 'success',
      body: newNote,
    };
  },)
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note'); 
  }
});

    // DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
    router.delete("/notes/:id", function (req, res) {
      fs.readFile("db/db.json", "utf8", (err, data) => {
          if (err) throw err;

          let notes = JSON.parse(data);
          // let notes = JSON.parse(notesData);
          let notesId = req.params.id;
          let newNotesId = 0;

          notes = notes.filter(currNote => {
              return currNote.id != notesId;
          });

          for (currNote of notes) {
              currNote.id = newNotesId.toString();
              newNotesId++;
          }

          fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
              if (err) throw err;
              console.log("Success!");
          });

          res.json(notes);
      });
  });

module.exports = router