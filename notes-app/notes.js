const fs = require('fs');

let addNote = (title, body) => {
    console.log('Adding a new note...');
    console.log(`Title: ${title}\nBody: ${body}`);

    const note = {
        title: body
    };

    fs.writeFileSync('./notes.json', JSON.stringify(note));
};

module.exports = {
    addNote,
};
