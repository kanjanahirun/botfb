var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var token = "CAAMlljgxbmQBAERXB6XphXjyDAnfkG2pzVI2zdhqZB1w91RKlnvPN4vRuZCroQ8m4bOTDhs0umU6aGcbgZAMSQ2ZCXYAyfC9k3xvEa2fk8KNKlwW38dS3mbcCWSS4OLrOPWRhzQJ1G0y7mrCsvw39QzgZBjxUzzdo6XfcWHKZBnBB7xZBCtSUqRkNZCuN9utYnQZD";
var app = express();
var check = 0;
var hi = 0;
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'zonlyoner') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

app.post('/webhook/', function (req, res) {
	
  var messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    var event = req.body.entry[0].messaging[i];
    var sender = event.sender.id;
    if (event.message && event.message.text) {
      var text = event.message.text;
      // Handle a text message from this sender
      console.log(text);
      if (hi == 0){
      	sendTextMessage(sender, "auto bot : สวัสดีคค่ะ");
      	hi = 1;
      }
      else if (text == '...'){
      	sendTextMessage(sender, "auto bot : มีอะไรให้ช่วยไหมคะ");
      }
      else if (text == 'อยากฟังเพลง'){
      	sendTextMessage(sender, "auto bot : เพลงอะไรค่ะ");
      	check = 1;
      }
      else if (check == 1){
      	sendTextMessage(sender, "https://www.youtube.com/results?search_query=" + text);
      	check = 0;
      }
			else if (text == 'อยากดูรูป'){
      	sendTextMessage(sender, "auto bot : อยากให้หารูปเกี่ยวกับอะไรค่ะ");
      	check = 2;
      }
      else if (check == 2){
      	sendTextMessage(sender, "auto bot :  https://www.google.co.th/search?q=" + text + "&source=lnms&tbm=isch");
      	check = 0;
      }
      else {
      	sendTextMessage(sender, "auto bot :  ดิฉันไม่เข้าใจที่คุณพิมพ์ค่ะ");
      }
    }
  }
  res.sendStatus(200);
});

function sendTextMessage(sender, text) { 
  var messageData = {
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});