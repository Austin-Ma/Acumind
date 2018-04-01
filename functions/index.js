//Express
var express = require('express');
var fs = require('fs');
var app = express(); 
var bodyParser = require('body-parser');
var cors = require('cors')({origin: true});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors);

//Firebase Functions (To host the nodejs on firebase server)
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp((functions.config().firebase));

//Ibm stuff 
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
//var ibmConfig = "ibmCredential.json";
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "6ec8f989-fec4-4b3d-8fc1-aeafd018a733",
  "password": "06HybEjwcVeb",
  "version": '2018-03-16'
});

exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.database().ref('/messages').push({original: original}).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref);
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onWrite((event) => {
  // Grab the current value of what was written to the Realtime Database.
  const original = event.data.val();
  console.log('Uppercasing', event.params.pushId, original);
  const uppercase = original.toUpperCase();
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return event.data.ref.parent.child('uppercase').set(uppercase);
});

// exports.addData = functions.https.onRequest((request, response) => {
// 	var userVal = {
// 		"timeCheck": request.params.timeScore,
// 		"sentiment": request.params.sentimentScore
// 	}

// 	return admin.database().ref("/userID/" + request.params.id + "/").push(userVal);
// });

exports.addData = functions.database.ref('/addData/{id}/{timeScore}/{sentimentScore}').onWrite((event) => {
	var userVal = {
		"timeCheck": events.params.timeScore,
		"sentiment": events.params.sentimentScore
	}

	return admin.database().ref("/" + events.params.id + "/").push(userVal);
});

exports.getDataAlt = functions.https.onRequest((req, res) => {
	return cors(req, res, () => {
		var userID = req.query.userID; 
		var object;

		console.log(req.query.userID);
		//console.log("HELLO!!!!");

		var booya = {
			"name": "william",
			"score": 1000
		}

		//res.send(booya);
		//return "MESSAGE";
 		//return admin.database().ref('/' + userID).once("value", (data) => {res.send(data);});
		 admin.database().ref('/' + userID).once("value", (data) => {res.send(data);});
		
		//admin.database().ref("/userID/" + userID).on("value", (data) => {var object = data.val()
		//	response.send(object);}, errData);
	});
});

exports.getData = functions.database.ref("/getData/{userID}").onWrite((event) => {
	cors(req, res, () => {
	//Check the reference and then return the data.
	var userID = event.params.userID; 

	admin.database().ref("/userID/" + userID).on("value", (data) => {var object = data.val()
		response.send(object);}, errData);
	});
});

//Clear the tree for the next user 
exports.clearData = functions.https.onRequest((req, res) => {
	console.log("Removing all Data");
	return admin.database().ref('/').remove();
});


exports.analyze = functions.https.onRequest((request, response) => {
	var score = 0; 
	var data = requests.body; 
	var text; 
	var timeCheck = 0;
	var arrayLength = data.length;
	var userID = data[arrayLength].id;  

	for(var i = 0; i < data.length - 1; i++){
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

	var userInfo = {
		"stringScore": score, 
		"timeString": timeIndex
	};

	return admin.database().ref('/userID').push(userInfo).then((snapshot) => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref);
  	});
});


exports.app = functions.https.onRequest(app);



