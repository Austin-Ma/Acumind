var fs = require('fs');


//Firebase Database 
var firebase = require('firebase');
var configFB = fs.readFileSync('configFB.json');
configFB = JSON.parse(configFB);

var database = firebase.initializeApp(configFB).database();

var data = {
	score: 123,
	name: "SHannoon"
}

var reference = database.ref('/');

reference.push(data);