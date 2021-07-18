const express = require('express');
const path = require('path');
const fs = require('fs');

let jsonFileRaw = fs.readFileSync('db/db.json');
let jsonData = JSON.parse(jsonFileRaw);
console.log(jsonData);





// For Test only
const tableData = require('./db/tableData'); //For test only
const { response } = require('express');


// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3030;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes

app.use(express.static('public')); //from https://stackoverflow.com/questions/24582338/how-can-i-include-css-files-using-node-express-and-ejs

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));


app.get('/api/notes', (req, res) => {
res.json(jsonData);



});




app.post('/api/notes', (req, res) => {

    const newNote = req.body;
    console.log(newNote); 
    jsonData.push(newNote);
    writeToFile(jsonData);
    jsonFileRaw = fs.readFileSync('db/db.json');
    jsonData = JSON.parse(jsonFileRaw);
    console.log(jsonData);
    res.json(newNote);

});

app.delete('/api/notes/:id', (req, res) => 
{
    jsonFileRaw = fs.readFileSync('db/db.json');
    jsonData = JSON.parse(jsonFileRaw);
    const toDelete = req.params.id;
    for (let i = 0; i < jsonData.length; i++) {
        if (toDelete === jsonData[i].id) {
            jsonData.splice(i, 1);
            writeToFile(jsonData);
          return res.json(jsonData);

        }
      }
 
  
    console.log(tableData);
    res.json(newNote);

});


function writeToFile(dataToWrite){
  const stringifiedData = JSON.stringify(dataToWrite);
  fs.writeFile('db/db.json', stringifiedData, err => {
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


// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));