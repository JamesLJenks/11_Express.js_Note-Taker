// Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');
// uuidv4(); What is this used for?
 
// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // What is this used for?


app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
    notesArray = [];

    if (notesArray.length === 0)
    notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db/json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});

function deleteNote(id,notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db/json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
    }
}

app.delete('/api/notes/:id', (req, res) => {
    
})
















// // Star Wars Characters (DATA)

// const characters = [
//   {
//     routeName: 'yoda',
//     name: 'Yoda',
//     role: 'Jedi Master',
//     age: 900,
//     forcePoints: 2000,
//   },
//   {
//     routeName: 'darthmaul',
//     name: 'Darth Maul',
//     role: 'Sith Lord',
//     age: 200,
//     forcePoints: 1200,
//   },
//   {
//     routeName: 'obiwankenobi',
//     name: 'Obi Wan Kenobi',
//     role: 'Jedi Master',
//     age: 55,
//     forcePoints: 1350,
//   },
// ];

// // Routes

// // Basic route that sends the user first to the AJAX Page
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'view.html')));

// app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'add.html')));

// // Displays all characters
// app.get('/api/characters', (req, res) => res.json(characters));

// // Displays a single character, or returns false
// app.get('/api/characters/:character', (req, res) => {
//   const chosen = req.params.character;

//   console.log(chosen);

//   /* Check each character routeName and see if the same as "chosen"
//    If the statement is true, send the character back as JSON,
//    otherwise tell the user no character was found */

//   for (let i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

// // Create New Characters - takes in JSON input
// app.post('/api/characters', (req, res) => {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body parsing middleware
//   const newCharacter = req.body;

//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();
//   console.log(newCharacter);

//   characters.push(newCharacter);
//   res.json(newCharacter);
// });

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
