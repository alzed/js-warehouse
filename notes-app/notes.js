const fs = require('fs');

const addNote = (title, body) => {
    console.log('Adding a new note...');
    let notes = loadNotes();
    let duplicateNotes = notes.filter(note => note.title === title);
    if (duplicateNotes.length === 0){
        notes.push({
            'title': title,
            'body': body
        });
    
        fs.writeFileSync('./notes.json', JSON.stringify(notes));
    } 
    else {
        console.log('Note with the title already present');
    }
};

const getNotes = () => {
    let allNotes = loadNotes();
    if (allNotes === []) {
        console.log('No notes found.');
    }
    else {
        console.log(allNotes);   
    }
};

const getNote = title => {
    let notes = loadNotes();
    notes.forEach(note => {
        if (note.title === title) {
            console.log(note);
        }
    });
};

const loadNotes = () => {
    try {
        let notes = fs.readFileSync('./notes.json');
        return JSON.parse(notes);
    } 
    catch (e) {
        return [];
    }
};

module.exports = {
    addNote,
    getNotes,
    getNote,
};
