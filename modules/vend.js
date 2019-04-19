"use strict";

// This file handles interactions with the GPIO pins to dispense product from
// the vending machine
// 
let gpio  = require('onoff').Gpio,
    sleep = require('system-sleep');


// This function will pull messages out of the chat session
// 
exports.dispenseBeverageSelection = (selection) => {

	// Log event. Note that selection is validated already
	//
	console.log( 'dispenseBeverageSelection:' + selection );

	// Activate the coin relay to make the vending machine
	// beleive it has accepted money
	//
	// PMH - we have wired the coin activation relay to always
	// believe it has money. This was done by reversing the Normal Open
    // and Normal Closed on the relay board. If your vending machine
    // is set up to require coins, the following code will bypass this
    // for SMS and Alexa interactions
    //
    
	// let coinActivation = new gpio(17, 'out');
	// coinActivation.writeSync(1);
	// sleep(500);
	// coinActivation.writeSync(0);
	// coinActivation.unexport();

	let beverage;

	// Determine which GPIO to use based on the desired beverage
	//
	if(selection === "COKE" ) {
	    beverage = new gpio(27, 'out');
	}
	else if( selection === "DIET COKE" ) {
	    beverage = new gpio(22, 'out');
	}
	else if( selection === "GINGERALE" ) {
	    beverage = new gpio(18, 'out');
	}
	else if( selection === "ROOT BEER" ) {
	    beverage = new gpio(23, 'out');
	}
	else if( selection === "BEER" ) {
        beverage = new gpio(13, 'out');

        // The beer rack is only single width to accomadate tall tins,
        // so the selector needs to fire twice to move the cam 
        // a full rotation. Fire once here/
        //
        sleep( 1000 );
        beverage.writeSync(1);
        sleep( 1000 );
        beverage.writeSync(0);
	}
        else {
            return;
        } 

	// Activate the relay to simulate the user pressing the desired beverage selector
	// switch
	//
    sleep( 1000 );	
    beverage.writeSync(1);
    sleep( 1000 );
    beverage.writeSync(0);
	
    // Free up the GPIO
    //
    beverage.unexport();

    // Exit
    //
    return;
};





