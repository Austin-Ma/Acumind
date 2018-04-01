//Express
var express = require('express');
var fs = require('fs');
var app = express(); 
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Firebase Functions (To host the nodejs on firebase server)
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp((functions.config().firebase));


//Firebase Database 
var firebase = require('firebase');
//var configFB = fs.readFileSync('../configFB.json');
//configFB = JSON.parse(configFB);
configFB = {
    "apiKey": "AIzaSyB4PUAFq_N-I5Ewt6ThvLOF8Squ0tCV0_U",
    "authDomain": "acumind-f0e34.firebaseapp.com",
    "databaseURL": "https://acumind-f0e34.firebaseio.com",
    "projectId": "acumind-f0e34",
    "storageBucket": "acumind-f0e34.appspot.com",
    "messagingSenderId": "1010008784476"
  };

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

//app.listen(3000, (response) => {
//	console.log("Listening on port 3000");
//});

//Probly won't need a static bc its just a server 
//app.use(express.static('../no'));

//Definitely need to change this later; 
//The current route is configured for a single tweet, 
//Need to configure for an array; 

exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref);
  });
});

app.post("/analyze", (request, response) => {
	var score = 0; 
	var data = requests.body; 
	var text; 
	var timeCheck = 0;
	var arrayLength = data.length;
	var userID = data[arrayLength].id;  

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

app.get("/getData/:userID", (request, response) => {
	//Check the reference and then return the data.
	var data = request.params; 
	var userID = data.userID; 

	//go into firebase database and get the json corresponding
	var ref = database.reference("/" + userID); 

	ref.on("value", (data) => { 
		var userData = data.val();
		response.send(userData);
	 }, errData);

});

//Clear the tree for the next user 
app.get("/clearData", (request, response) => {
	var reference = database.ref('/');
	reference.remove();
});

app.get("/sham", (request, response) =>{
	var stuff = {
		"score": 100,
		"name": "shannon"
	}

	database.push(stuff);
});

exports.app = functions.https.onRequest(app);


