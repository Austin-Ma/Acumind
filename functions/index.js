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
var configFB = fs.readFileSync('configFB.json');
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
	  	
	    //For loop to add sentimente score to JSON;


	  	//Analysis Function, so call sentimentSum and timeCheck


	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	  });


	//Add to the firebase server of the sentiment sum and the time stamp result

});

//Analysis Functions
function sentimentSum(tweetProfileArray){
	//Sum up the overall scores?
	var sentimentScore = "sentimentScore";
	var sentimentSum = 0; 
	for(var i = 0; i < tweetProfileArray.length; i++){
		var object = tweetProfileArray[i];
		for(var sentimentScore in object){
			var key = sentimentScore;
			sentimentSum = sentimentSum + object[key];
		}
	}

	return sentimentSum;
}

//Checking time stamp
function timeCheck(tweetProfileArray){
	//Compute the percentage of the amount of tweets in bad time
	var timestamp = "timestamp";
	var timeAvg = 0; 
	for(var i = 0; i < tweetProfileArray.length; i++){
		var object = tweetProfileArray[i];
		for(var timestamp in object){
			var timeInt = parseInt(object[key]); 
			if(timeInt >= 0 && timeInt <= 4){
				var key = timestamp;
				timeAvg = timeAvg + timeInt; 
			}
		}
	}

	return timeAvg / tweetProfileArray.length;
}

// //Add the sentiment/timeAvg result to the database
// app.get("/addData/:userID/:sentimentTotal/:timeCheck", (request, response) => {
// 	var sentimentTotal = sentimentSum(tweetProfileArray); 
// 	var timeCheck = timeCheck(tweetProfileArray); 

// 	var result = [sentimentTotal, timeCheck]; 
// 	database.push(result); 
// });

//TODO: add change to route with userID for firebase 
function addData(userID, sentimentScore, timeCheck){
	var stringScore = "sentimentScore";
	var timeString = "timeCheck"; 

	var data = {
		stringScore:sentimentScore, 
		timeString:timeCheck
	};

	database.push(data); 
}

//based off userID 
app.get("/getData/:userID", (request, response) => {
	//Check the reference and then return the data.
	var data = request.params; 

	//go into firebase database and get the json corresponding


});

//Clear the tree for the next user 
app.get("/clearData", (request, response) => {
	var reference = database.ref('/');
	reference.remove();
});

exports.app = functions.https.onRequest(app);

