const fs = require('fs');

const addNote = (title, body) => {
    console.log('Adding a new note...');
    let notes = loadNotes();
    let duplicateNote = notes.find(note => note.title === title);
    if (!duplicateNote){
        notes.push({
            'title': title,
            'body': body
        });
    
        saveNotes(notes);
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
    let foundNote = notes.find(note => note.title === title);
    if (foundNote){
        console.log(foundNote);
    }
    else {
        console.log(`No note ${title} found`);
    }
    
};

const removeNote = title => {
    const notes = loadNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    
    if (notes.length === filteredNotes.length){
        console.log(`Note ${title} not found.`);
    }
    else{
        saveNotes(filteredNotes);
        console.log('Note removed');
    }
};

const updateNote = (title, body) => {
    const notes = loadNotes();
    let update = false;
    notes.forEach(note => {
        if (note.title === title){
            note.body = body;
            update = true;
        }
    });
    
    if (update) {
        saveNotes(notes);
        console.log('Note updated');
    }
    else {
        console.log(`No note ${title} found`);
    }
    
};

const listNotes = () => {
    let notes = loadNotes();
    if (notes.length === 0) { console.log('No notes found'); }
    notes.forEach(note => console.log(note.title));
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

const saveNotes = notes => {
    let stringNotes = JSON.stringify(notes);
    fs.writeFileSync('./notes.json', stringNotes);
};

module.exports = {
    addNote,
    getNotes,
    getNote,
    removeNote,
    updateNote,
    listNotes
};
