var fs = require('fs');


//Firebase Database 
var firebase = require('firebase');
var configFB = fs.readFileSync('configFB.json');
configFB = JSON.parse(configFB);

var database = firebase.initializeApp(configFB).database();

var data = {
	sentimentScore: 0.25,
	timeAverage: 12
}


var reference = database.ref('/');

// reference.remove();
reference.push(data, callback);
function callback(response){
	console.log("success");
}
