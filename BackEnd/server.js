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

//Connect server to DB

const connectString = 'mongodb+srv://admin:ballygowan@cluster0.toceu.mongodb.net/movies?retryWrites=true&w=majority';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(connectString);
}

//Define DB Schema

const Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: String,
    year: String,
    poster: String
});

//Compile model from schema

var MovieModel = mongoose.model("movie", movieSchema);

// Responds to any request which includes the '/api/movies' path with movie info in JSON form
app.get('/api/movies', (req, res) => {
    const myMovies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        },
        {
            "Title": "War of the Worlds",
            "Year": "2005",
            "imdbID": "tt0407304",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SX300.jpg"
        }
    ];

    //Response: Create object 'movies' and pass JSON data to it from above myMovies variable
    res.status(200).json({
        message: "All good",
        movies: myMovies
    })
})

// listens for POST request and logs values from form to server console
app.post('/api/movies', (req, res) => {
    console.log(`Movie Received`);
    console.log(req.body.Title);
    console.log(req.body.Year);
    console.log(req.body.Poster);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})