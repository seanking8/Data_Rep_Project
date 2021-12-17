//This app starts a server using Express and listens on port 4000 for connections

const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


// let mbid = "9c9f1380-2516-4fc9-a3e6-f9f61941d090";

// async function main() {
//     let releases = [];

//     app.get('https://musicbrainz.org/ws/2/release?artist=9c9f1380-2516-4fc9-a3e6-f9f61941d090&inc=recordings+release-groups+ratings&limit=100&fmt=json', (req, res) => {

//         //response = res.json(data);
//         console.log(res);
//     })
// }

// main();

// //import fetch from "node-fetch";
// const fetch = require('node-fetch');

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function main() {
//     let mbid = "9c9f1380-2516-4fc9-a3e6-f9f61941d090";
//     let releases = [];

//     let response = await fetch(`https://musicbrainz.org/ws/2/release?artist=${mbid}&inc=recordings+release-groups+ratings&limit=100&fmt=json`);
//     let jsonResponse = await response.json();
//     releases.push(jsonResponse.releases);
//     let releaseCount = jsonResponse["release-count"];

//     for (let offset = 100; offset < releaseCount; offset += 100) {
//         await sleep(1000);
//         let response = await fetch(`https://musicbrainz.org/ws/2/release?artist=${mbid}&inc=recordings+release-groups+ratings&offset=${offset}&limit=100&fmt=json`);
//         let jsonResponse = await response.json();
//         releases.push(jsonResponse.releases);
//     }

//     if (releases.flat(1).length == releaseCount) {
//         console.log("All releases were fetched");
//     } else {
//         console.log("Problem: some releases were not fetched");
//     }

//     console.log(releases);
// }

// main();





// const MusicBrainzApi = require('musicbrainz-api').MusicBrainzApi;

// const mbApi = new MusicBrainzApi({
//   appName: 'Record-Scratch',
//   appVersion: '0.1.0',
//   appContactInfo: 'seank579@gmail.com'
// });

// // const config = {
// //     appName: 'Record-Scratch',
// //     appVersion: '0.1.0',

// //     // Optional, default: no proxy server
// //     // proxy: {
// //     //   host: 'localhost',
// //     //   port: 8888
// //     //  },

// //     // Your e-mail address, required for submitting ISRCs
// //     appMail: 'seank579@gmail.com'
// //   }

//   //const mbApi = new MusicbrainzApi(config);

//   const artist = mbApi.getEntity('artist', 'ab2528d9-719f-4261-8098-21849222a0f2');

//   console.log(artist);


// app.get('/authorize', function(req, res){
// 	var oAuth = new Discogs().oauth();
// 	oAuth.getRequestToken(
// 		'TsDBbPiVMJQviCevQPbs', 
// 		'TLXJlnvgkKJUvSraNPTGwbodTOUXxWWM', 
// 		'http://your-script-url/callback', 
// 		function(err, requestData){
// 			// Persist "requestData" here so that the callback handler can 
// 			// access it later after returning from the authorize url
// 			res.redirect(requestData.authorizeUrl);
// 		}
// 	);
// });

// app.get('https://api.discogs.com/oauth/request_token', (req, res)=>{

// });

// var Discogs = require('disconnect').Client;
// const { default: axios } = require('axios');

// // Authenticate by user token
// //var dis = new Discogs({userToken: 'https://api.discogs.com/oauth/access_token'});
// var dis = new Discogs('RecordScratch/1.0', {userToken: 'https://api.discogs.com/oauth/access_token'});


// // Authenticate by consumer key and secret
// var dis = new Discogs({
// 	consumerKey: 'TsDBbPiVMJQviCevQPbs', 
// 	consumerSecret: 'TLXJlnvgkKJUvSraNPTGwbodTOUXxWWM'
// });

// var db = new Discogs().database();
// db.getRelease(176126, function(err, data){
// 	console.log(data);
// });

// var dis = new Discogs('RecordScratch/1.0', {userToken: 'https://api.discogs.com/oauth/access_token'});




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
    Rating: Number,
    CoverArt: String
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
    console.log(req.body.CoverArt);

    AlbumMod.create({
        Title: req.body.Title,
        Artist: req.body.Artist,
        Rating: req.body.Rating,
        CoverArt: req.body.CoverArt
    })

    //Send confirmation to the client
    res.send(req.body.Title+' Added!'+'\n'+req.body.CoverArt);
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