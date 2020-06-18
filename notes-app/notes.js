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
    const notes = loadNotes();
    let filteredNote = notes.filter(note => note.title === title);
    console.log(filteredNote[0]);  
};

const removeNote = title => {
    const notes = loadNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    
    if (notes.length === filteredNotes.length){
        console.log(`Note ${title} not found.`);
    }
    else{
        fs.writeFileSync('./notes.json', JSON.stringify(filteredNotes));
        console.log('Note removed');
    }
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
    removeNote,
};
