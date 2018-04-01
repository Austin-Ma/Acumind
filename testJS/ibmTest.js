var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
//var ibmConfig = "ibmCredential.json";
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "6ec8f989-fec4-4b3d-8fc1-aeafd018a733",
  "password": "06HybEjwcVeb",
  "version": '2018-03-16'
});

var parameters = {
  'text': 'While we are on the subject, it is reported that the U.S. Post Office will lose $1.50 on average for each package it delivers for Amazon. That amounts to Billions of Dollars. The Failing N.Y. Times reports that “the size of the company’s lobbying staff has ballooned,”',
  'features': {
     'keywords': {
      'sentiment': true,
      'limit': 1
    }
  }
}

natural_language_understanding.analyze(parameters, function(err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});