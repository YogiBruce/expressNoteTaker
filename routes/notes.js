const notes = require('express').Router()
const {
    readFromFile,
    readAndAppend,
    readAndDelete
} = require('../helpers/fsUtils');

const uuid = require('../helpers/uuid')

//GET
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST
notes.post('/', (req, res) => {
    console.info(`${req.method} request received`);
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid()
        };
        readAndAppend(newNote, './db/db.json');
        const response = {
            status: 'success',
            body: newNote
        };
        res.json(response)
    } else {
        res.json('Error in posting note')
    }
});

//DELETE
notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        readAndDelete(id, '.db/db.json')
        res.json('Note deleted')
    } else {
        res.json('Error deleting note')
    }
});

module.exports = notes;