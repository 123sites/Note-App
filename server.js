// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');
 

// Api/index.js/start
// Sets up the server
const PORT = process.env.PORT || 3001;
 
const app = express();
 
// Sets up Express App
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// __dirname returns the directory that the currently
// executing script is in.  Sends file to index.html 
// in the public folder.
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/notes.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data);
      res.json(parsedNotes);
    }
  });
});

// Routers

// GET Route for the homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Starts server, begins listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // DELETE NEXT 2 LINES???
  // Destructuring assignment for the items in req.body
  const { note } = req.body;  

  // If all the required properties are present
  if (note) {
    // Variable for the object we will save
    const newNote = {
      note
    };

    // GET api notes
    app.get('./db/notes', (req, res) => { 
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
    });

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




////////////////////////////////////////////////////////////////////////////
// You haven’t learned how to handle DELETE requests, but this application 
// offers that functionality on the front end. As a bonus, try to add the DELETE route to the application using the following guideline:

// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need 
// to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

// // Api route, delete request
app.delete("/api/notes/:id", function(req, res) {
  deleteNote = parseInt(req.params.id);
  readFileAsync("./db/db.json", "utf8").then(function(data) {
    const notes = [].concat(JSON.parse(data));
    const notesNew = []
    for (let i = 0; i<notes.length; i++){
      if(deleteNote !== notes[i].id) {
        notesNew.push(notes[i]) 
      }
    }
    return notesNew
    }).then(function(notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes))
      res.send('Save was successful!');
    })
  })

  // HTML routes
  app.get("/db/notes", function(req, res) { 
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
// //////////////////////////////////////////////////////////////////////////////////////
//     // DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
//     app.delete("/api/notes/:id", function (req, res) {
//       fs.readFile("db/db.json", "utf8", (err, data) => {
//           if (err) throw err;

//           let notes = JSON.parse(data);
//           // let notes = JSON.parse(notesData);
//           let notesId = req.params.id;
//           let newNotesId = 0;

//           notes = notes.filter(currNote => {
//               return currNote.id != notesId;
//           });

//           for (currNote of notes) {
//               currNote.id = newNotesId.toString();
//               newNotesId++;
//           }

//           fs.writeFileSync("db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
//               if (err) throw err;
//               console.log("Success!");
//           });

//           res.json(notes);
//       });
//   });
// }





