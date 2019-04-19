let Alexa = require('ask-sdk');
let skill;
let vendMachine = require('./vend');

// This is our skill handler for processing the selected beverage
//
const BeverageSelectionHandler = {
    canHandle(handlerInput) {
        console.log('Request.type = ' + handlerInput.requestEnvelope.request.type );
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'beverageIntent';
    },
    handle(handlerInput) {

        // Currently Alexa only dispenses the beer
        //
        vendMachine.dispenseBeverageSelection( "BEER");

        const speechText = 'Here you go! Enjoy your ice cold beer.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Beer', speechText)
            .getResponse();
    }
};

let express    = require('express'),
    bodyParser = require('body-parser'),
    router     = express.Router();

router.use(bodyParser.json());

// Main handler for skill from Alexa
//
router.post('/intent', function(req, res) {

    // Check if there is a handler assigned yet
    //
    if( ! skill ) {
        // Assign the beverage selection handler
        //
        skill = Alexa.SkillBuilders.custom().addRequestHandlers(BeverageSelectionHandler).create();
    }

    // Invoke the skill handler
    //
    skill.invoke( req.body ).then(function( responseBody ) {
        res.json( responseBody );
    }).catch(function( error ) {
        console.log( error );
        res.status(500).send( 'Error during the request' );
    });
});

module.exports = router;