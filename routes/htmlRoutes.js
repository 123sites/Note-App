const router = require ('express').Router();
const fs = require ('fs');
const path = require('path');

// __dirname returns the directory that the currently
// executing script is in.  Sends file to index.html 
// in the public folder.
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

// GET Route for notes page
// Delivers the html (website) dynamically in the browser. (View route)
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

module.exports = router