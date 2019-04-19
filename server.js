let express    = require('express'),
    bodyParser = require('body-parser'),
    twilio     = require('./modules/twilio'),
    alexa      = require('./modules/alexa'),
    app        = express();

// Set port - the port is selected by Heroku, and when running locally it is 5000
// Regardless of the port selected by Heroku, they will map the application URL
// port 443 to the internal instance and port
//
app.set('port', 3000);

// Set parser method
//
app.use(bodyParser.urlencoded({extended: false}));

// Set a handler for messages from Twilio
//
app.use('/twilio', twilio);
app.use('/alexa', alexa);

// Start the webserver listenting on the specified port
//
app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
