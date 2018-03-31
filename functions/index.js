// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//Express
var express = require('express');
var fs = require('fs');
var app = express(); 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Firebase Functions (To host the nodejs on firebase server)
const functions = require('firebase-functions');

//Firebase Database 
var firebase = require('firebase');
var configFB = fs.readFileSync('../../configFB.json');
configFB = JSON.parse(configFB);

var database = firebase.initializeApp(configFB).database();

// Imports the Google Cloud client library
const language = require('@google-cloud/language');
// Instantiates a client
const client = new language.LanguageServiceClient();

app.listen(3000, (response) => {
	console.log("Listening on port 3000");
});

//Probly won't need a static bc its just a server 
app.use(express.static('../no'));

//Definitely need to change this later; 
//The current route is configured for a single tweet, 
//Need to configure for an array; 
app.post("/analyze", (request, response) => {
	var text = request.body.tweet; 
	var timestamp = parseInt(request.body.timestamp);

	//Send to the router dealing w/ sentiment analysis 
	var documents = {
		content: text, 
		type: 'PLAIN_TEXT',
	};

	// Detects the sentiment of the text
	client.analyzeSentiment({document: document}).then(results => {
	    const sentiment = results[0].documentSentiment;

	    //console.log(`Text: ${text}`);
	    //console.log(`Sentiment score: ${sentiment.score}`);
	    //console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
	  	
	  	//Analysis Function 


	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	  });
});

//Analysis Functions
function sentimentSum(JSONArray){
	//Sum up the overall scores? 

}

//Add the sentiment result to the database
app.get("/addData", (request, response) => {
	//Write to firebase 

})

app.get("/addData", returnValue)

function returnValue(request, response){

}

app.get("/addData", function returnValue(request, response){

});

//Clear the tree for the next user 
app.get("clearData", (request, response) => {

})

exports.app = functions.https.onRequest(app);

