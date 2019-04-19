"use strict";

// This file handles SMS messaging from Twilio
//
let request     = require('request'),
    express     = require('express'),
    bodyParser  = require('body-parser'),
    twilio      = require('twilio'),
    vendMachine = require('./vend'),

    MessagingResponse = twilio.twiml.MessagingResponse,
    router            = express.Router();

// Set up the router to handle messages from Twilio
//
router.use(bodyParser.urlencoded({extended: false}));

// Webhook invoked from Twilio for handling SMS messages
//
router.post('/sms', (req, res) => {

    // Extract parameters
    //
    let messageText = req.body.Body;
    let sender      = req.body.From;
    let twilioResp  = new MessagingResponse();

    // Display some information
    //
    console.log('Twilio SMS received: ' + messageText + ' from ' + sender);

    // Validate user (if desired)
    //
    //if ( ( sender !== '+18885551234') &&
    //     ( sender !== '+18885552345') ) {

        // This is not a recognized number
        //
    //   twilioResp.message('You are not authorized to access the vending machine.');
    //   res.set('Content-Type', 'text/xml');
    //   res.status(200).send(twilioResp.toString());    
    //}

    // Determine which beverage has been selected
    //
    if( messageText.toUpperCase() === "COKE" ) {

        // User has requested a Coke. Dispense the product from the vending machine
        //
        vendMachine.dispenseBeverageSelection( "COKE");

        // Return a SMS response
        //
        twilioResp.message('Enjoy your ' + messageText + '.');
    }
    else if( messageText.toUpperCase() === "DIET COKE" ) {

        // User has requested a Diet Coke. Dispense the product from the vending machine
        //
        vendMachine.dispenseBeverageSelection( "DIET COKE");

        // Return a SMS response
        //
        twilioResp.message('Enjoy your ' + messageText + '.');
    }
    else if( messageText.toUpperCase() === "GINGERALE" ) {

        // User has requested a GengerAle. Dispense the product from the vending machine
        //
        vendMachine.dispenseBeverageSelection( "GINGERALE");

        // Return a SMS response
        //
        twilioResp.message('Enjoy your ' + messageText + '.');
    }
    else if( messageText.toUpperCase() === "ROOT BEER" ) {

        // User has requested a Root Beer. Dispense the product from the vending machine
        //
        vendMachine.dispenseBeverageSelection( "ROOT BEER");

        // Return a SMS response
        //
        twilioResp.message('Enjoy your ' + messageText + '.');
    }
    else if( messageText.toUpperCase() === "BEER" ) {

        // User has requested a Beer. Dispense the product from the vending machine
        //
        vendMachine.dispenseBeverageSelection( "BEER");

        // Return a SMS response
        //
        twilioResp.message('Enjoy your ' + messageText + '.');
    }
    else {
        // User has requested something that is not in the vending machine
        //
        twilioResp.message('Please select from Coke, Diet Coke, Gingerale, Root Beer, or Beer.');
    }

    // Send the appropriate response to the SMS user
    //
    res.set('Content-Type', 'text/xml');
    res.status(200).send(twilioResp.toString());    
    return;
});

module.exports = router;
