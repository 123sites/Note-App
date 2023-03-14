// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const apiRoutes = require('./routes/apiRoutes')
const htmlRoutes = require('./routes/htmlRoutes')

// Connects to the Heroku port or 3001.
const PORT = process.env.PORT || 3001;
 
const app = express();
 
// Sets up Express App
// Middleware for parsing JSON and urlencoded form data
// Body parser
app.use(express.json());
// Allows url codes
app.use(express.urlencoded({ extended: true }));

// Delivers the public folder
app.use(express.static('public'));

// Routes to the api 
app.use('/api', apiRoutes);

app.use(htmlRoutes)

// Starts server, begins listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


