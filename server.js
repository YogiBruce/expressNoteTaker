//Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');

//Set port
const PORT = process.env.PORT || 3001;


//Initiate
const app = express();

//Parse incoming array data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Request data
const { notes } = require('./data/db/json')

app.get('/api/notes', (req, res) => {
  res.json(notes);
})

//Create new note
function createNewNote (body, notesArray) {
  const note = body;
  notesArray.push(note)

  //Write file
  fs.writeFileSync(
    path.join(__dirname, './data/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  )

  return note;
};

//Validate data
function validateNote (note) {
  if (!note.title || typeof note.text !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true
}

//POST route
app.post('/api/notes', (req, res) => {
  req.body.id = notes.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send('Note is incorrect format')
  } else {
    const note = createNewNote(req.body, notes);

    res.json(note);
  }
});

//DELETE notes
app.delete('/api', (req, res) => {
  const id = req.params.id;
  let note

  notes.map((element, index) => {
    if (element.id == id) {
      note = element
      notes.splice(index, 1)
      return res.json(note);
    }
  })
});

//Route to index
app.get('/', (req, res) => 
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