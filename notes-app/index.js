const yargs = require('yargs');
const notes = require('./notes');

yargs.version('1.0.0');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Title for a new note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => notes.addNote(argv.title, argv.body)
});

yargs.command({
    command: 'show',
    describe: 'Show a note',
    builder: {
        title: {
            describe: 'Title of the note',
            type: 'string'
        },
    },
    handler: argv => { 
        if (argv.title){
            return notes.getNote(argv.title);
        }
        return notes.getNotes();
    }
});

yargs.command({
    command: 'delete',
    describe: 'Delete a note',
    builder: {
        title: {
            describe: 'Title for the note to be deleted',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => notes.removeNote(argv.title)
});

yargs.command({
    command: 'update',
    describe: 'Update a note',
    builder: {
        title: {
            describe: 'Title of the note to be updated',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => notes.updateNote(argv.title, argv.body)
});

yargs.command({
    command: 'list',
    describe: 'List title of all notes',
    handler: argv => notes.listNotes()
});

yargs.parse();
