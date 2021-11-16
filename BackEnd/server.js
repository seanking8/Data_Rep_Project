//This app starts a server using Express and listens on port 4000 for connections

const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');

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

//Connect server to hosted MongoDB database

const connectString = 'mongodb+srv://admin:ballygowan@cluster0.toceu.mongodb.net/movies?retryWrites=true&w=majority';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(connectString);
}

//Define database Schema

const Schema = mongoose.Schema;

var movieSchema = new Schema({
    Title: String,
    Year: String,
    Poster: String
});

//Compile model from schema

var MovieModel = mongoose.model("movie", movieSchema);

// Respond to any request which includes the '/api/movies' path with movie info in JSON form
app.get('/api/movies', (req, res) => {

    MovieModel.find((err, data) => {
        res.json(data);
    })
})

//Listen for any GET request to '/api/movies/:id', identify which document the id belongs to and respond with the corresponding JSON info
app.get('/api/movies/:id', (req, res) => {

    MovieModel.findById(req.params.id, (err, data) => {
        res.json(data);
    })
})

//make async call to db, find record by id and overwrite it, send back data
app.put('/api/movies/:id', (req, res) => {
    console.log(req.body);

    MovieModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
        res.send(data);
    })
})

// listens for POST request and logs values from form to server console.
// Now creates new document in database and stores the values
app.post('/api/movies', (req, res) => {
    console.log(`Movie Received`);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);

    MovieModel.create({
        Title: req.body.Title,
        Year: req.body.Year,
        Poster: req.body.Poster
    })

    //Send confirmation to the client
    res.send('Movie Added!');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})