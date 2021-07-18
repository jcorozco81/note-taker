// Dependencies
const express = require('express');
const path = require('path');

// For Test only
const tableData = require('./db/tableData'); //For test only


// Sets up the Express App

const app = express();
const PORT = 3030;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes

app.use(express.static('public')); //from https://stackoverflow.com/questions/24582338/how-can-i-include-css-files-using-node-express-and-ejs

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));


app.get('/api/notes', (req, res) => res.json(tableData));


app.post('/api/notes', (req, res) => {

    const newNote = req.body;
 
    console.log(newNote);
  
    tableData.push(newNote);
    console.log(tableData);
    res.json(newNote);

});

app.delete('/api/notes/:id', (req, res) => 
{

    const toDelete = req.params.id;

    for (let i = 0; i < tableData.length; i++) {
        if (toDelete === tableData[i].id) {
            tableData.splice(i, 1);

          return res.json(tableData);
        }
      }
 
  
    console.log(tableData);
    res.json(newNote);

});






// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));