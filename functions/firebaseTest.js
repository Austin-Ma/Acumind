var fs = require('fs');


//Firebase Database 
var firebase = require('firebase');
var configFB = fs.readFileSync('configFB.json');
configFB = JSON.parse(configFB);

var database = firebase.initializeApp(configFB).database();

<<<<<<< HEAD:functions/testJS/firebaseTest.js
var data = {
	score: 123,
	name: "SHannoon"
}
=======
//var data = {
//	score: 100,
//	name: "William"
//}
>>>>>>> 869ebb9f9cc349881ee35573b51022c726e21938:functions/firebaseTest.js

var reference = database.ref('/');

reference.remove();