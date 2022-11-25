//Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');
const api = require('./routes/index')

//Set port
const PORT = process.env.PORT || 3001;


//Initiate
const app = express();

//Parse incoming array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/api', api)

//POST route
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err)
      } else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
            ? console.error(writeErr)
            : console.info('Note posted successfully')
        )
      }
    })

    const response = {
      status: 'success',
      body: newNote
    };

    console.log(response);
    res.status(201).json(response)
  } else {
    res.status(500).json('Error in posting note')
  }
});

//Route to index
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html')
    ));

//Route to notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

//Listen for server connection
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT} 🚀`)
});