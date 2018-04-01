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

//Ibm stuff 
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
//var ibmConfig = "ibmCredential.json";
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "6ec8f989-fec4-4b3d-8fc1-aeafd018a733",
  "password": "06HybEjwcVeb",
  "version": '2018-03-16'
});

app.listen(3000, (response) => {
	console.log("Listening on port 3000");
});

//Probly won't need a static bc its just a server 
app.use(express.static('../no'));

//Definitely need to change this later; 
//The current route is configured for a single tweet, 
//Need to configure for an array; 

app.post("/analyze", (request, response) => {
	var score = 0; 
	var data = requests.body; 
	var text; 
	var timeCheck = 0;
<<<<<<< HEAD
	var arrayLength = data.length;
	var userID = data[arrayLength].id;  
=======
	var userID = data[data.length].id;  
	var timeIndex = 0; 
>>>>>>> d646c2746e7a54fdd95b17731d4aaa8b389cc461

	for(var i = 0; i < data.length-1; i++){
		//Send to the router dealing w/ sentiment analysis 
		var documents = {
			'text': data[i].text, 
			'feature': {
				'keywords': {
					'sentiment': true, 
					'limit': 1
				}
			}
		};

		//TODO
		//make sure to retrieve timestamp //data[i].created_at
		//concatenate string to get time only

		//Fri Oct 20 09:08:07 +0000 2017

		//concatenate string 
		timeCheck = parseInt(data[i].created_at.substr(11)); 


		// Detects the sentiment of the text
		natural_language_understanding.analyze(documents, (err, response) => {
		  if (err)
		    console.log('error:', err);
		  else{
		  	// console.log((response.keyword.sentiment.score, null, 2));
		  	score = score + response.keyword.sentiment.score; 
		  	timeCheck = timeCheck + data[i].created_at; 

		  	if(timeCheck >= 0 && timeCheck <= 4){
		  		timeIndex++;
				timeAvg = timeAvg + timeCheck; 
			}


		  }
		});
}

timeIndex = timeIndex/(data.length-1);

addData(userID, score, timeIndex); 

});

/*//Analysis Functions
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
*/

//Checking time stamp
// function timeCheck(tweetProfileArray){
// 	//Compute the percentage of the amount of tweets in bad time
// 	var timestamp = "timestamp";
// 	var timeAvg = 0; 
// 	for(var i = 0; i < tweetProfileArray.length; i++){
// 		var object = tweetProfileArray[i];
// 		for(var timestamp in object){
// 			var timeInt = parseInt(object[key]); 
// 			if(timeInt >= 0 && timeInt <= 4){
// 				var key = timestamp;
// 				timeAvg = timeAvg + timeInt; 
// 			}
// 		}
// 	}

// 	return timeAvg / tweetProfileArray.length;
// }
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


