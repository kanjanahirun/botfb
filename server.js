var express = require('express');
var app = express();

app.get('/', function (req, res){
	res.send('Hello World!');
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
	console.log('Excample app listening on port' + app.get('port'));
});

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === <jirayubot>) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});