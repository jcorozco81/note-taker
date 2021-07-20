// Modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid'); //Unique ID Package

// Variables
let jsonFileRaw = fs.readFileSync('db/db.json');
let jsonData = JSON.parse(jsonFileRaw);
console.log(jsonData);

// Sets Express
const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// .html Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// api Routes
app.get('/api/notes', (req, res) => res.json(jsonData));

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    //Obsolete function
    // newNote.id = (parseInt(checkID())+1).toString(); 
      newNote.id = uniqid.time('note-');
      jsonData.push(newNote);
      console.log("Note added");
      writeToFile(jsonData);
      return res.end();
});

app.delete('/api/notes/:id', (req, res) => 
{
    // jsonFileRaw = fs.readFileSync('db/db.json');
    // jsonData = JSON.parse(jsonFileRaw);
    const toDelete = req.params.id;
    for (let i = 0; i < jsonData.length; i++) {
        if (toDelete == jsonData[i].id) {
            jsonData.splice(i, 1);
            console.log("Note deleted");
            writeToFile(jsonData);            
            return res.end();
        }
      }
    });

// Function to write to JSON file
function writeToFile(dataToWrite){
  const stringifiedData = JSON.stringify(dataToWrite);
  fs.writeFile('db/db.json', stringifiedData, err => {
    jsonFileRaw = fs.readFileSync('db/db.json');
    jsonData = JSON.parse(jsonFileRaw);
    console.log("File updated.")
    if (err) {
      console.error(err)
      return
    }
  })
 }

//  function readFromFile() {
//   let jsonFileRaw = fs.readFileSync('db/db.json');
//   let jsonData = JSON.parse(jsonFileRaw);
//   console.log(jsonData);
//   return (data);
//   }


//Obsolete function
// function checkID(){
//   let idTest = "0";
//   jsonData.forEach(element => {
//     console.log(`Element ID: ${element.id}`);
//     if (element.id > idTest){
//       idTest=element.id;
//     }});
//   return idTest;
// }


// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT`));