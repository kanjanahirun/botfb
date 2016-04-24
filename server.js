var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var token = "CAAMlljgxbmQBAERXB6XphXjyDAnfkG2pzVI2zdhqZB1w91RKlnvPN4vRuZCroQ8m4bOTDhs0umU6aGcbgZAMSQ2ZCXYAyfC9k3xvEa2fk8KNKlwW38dS3mbcCWSS4OLrOPWRhzQJ1G0y7mrCsvw39QzgZBjxUzzdo6XfcWHKZBnBB7xZBCtSUqRkNZCuN9utYnQZD";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.use(bodyParser.json());

app.get('/', function (req, res){
	res.send('Hello World!');
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
	console.log('Excample app listening on port' + app.get('port'));
});

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === "jirayubot") {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});

app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
      console.log(text);

      sendTextMessage(sender,text);

    }
  }
  res.sendStatus(200);
});


