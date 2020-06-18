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
            demandOption: true,
            type: 'string'
        },
    },
    handler: argv => notes.getNote(argv.title)
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
    handler: argv => {
        console.log('Deleting note');
    }
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
    handler: argv => {
        console.log('Updating note');
    }
});

yargs.command({
    command: 'showall',
    describe: 'Show all notes',
    handler: argv => notes.getNotes()
});

yargs.parse();
