//This app starts a server using Express and listens on port 4000 for connections

const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

//bodyParser is deprecated. As of V4.16, it is inbuilt into Express
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use(cors());

//Code to avoid a CORS error
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Configuration - point to build folder and static folder
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

//Connect server to hosted MongoDB database

const connectString = 'mongodb+srv://rsdbuser:rsdb@cluster0.7av32.mongodb.net/albums?retryWrites=true&w=majority';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(connectString);
}

//Define database Schema

const Schema = mongoose.Schema;

var albumSchema = new Schema({
    Title: String,
    Artist: String,
    Rating: Number
});

//Compile model from schema

var AlbumMod = mongoose.model("albums", albumSchema);

// Respond to any request which includes the '/albums' path with movie info in JSON form
app.get('/albums', (req, res) => {

    AlbumMod.find((err, data) => {
        res.json(data);
    })
})

//Listen for any GET request to '/albums/:id', identify which document the id belongs to and respond with the corresponding JSON info
app.get('/albums/:id', (req, res) => {

    AlbumMod.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

//make async call to db, find record by id and overwrite it, send back data
app.put('/albums/:id', (req, res) => {
    console.log(req.body);

    AlbumMod.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
        res.send(data);
    })
})

// listens for POST request and logs values from form to server console.
// Now creates new document in database and stores the values
app.post('/albums', (req, res) => {
    console.log(`Album Received`);
    console.log(req.body.Title);
    console.log(req.body.Artist);
    console.log(req.body.Rating);

    AlbumMod.create({
        Title: req.body.Title,
        Artist: req.body.Artist,
        Rating: req.body.Rating
    })

    //Send confirmation to the client
    res.send('Album Added!');
})

//Listens for DELETE request at the below path and reads ID from URL.
//Then locates corresponding record in DB and deletes it
app.delete('/albums/:id', (req, res) => {
    console.log("Delete album: " + req.params.id);

    AlbumMod.findByIdAndDelete(req.params.id, (err, data) => {
        res.send(data);
    })
})

//Listens for GET requests for any URL that is not described above and serves index.html page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})