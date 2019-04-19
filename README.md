Twilio SMS Integraiton to Vendo Vending Machine
-----------------------------------------------------------
This application allows SMS users to interact with our Pop Machine to select a beverage.
Alexa controls have also been added, which requires an Alexa skill to be created in the Alexa developer console.

# Step 1: Raspberry Pi 3 setup

1. The exact hardware was purchased from Amazon: https://www.amazon.ca/gp/product/B07GC9WH8Z/ref=ppx_yo_dt_b_asin_title_o05_s00?ie=UTF8&psc=1
    - Follow the instructions to update the OS to the latest

2. The GPIO pins are used to drive a relay module that will interact with the Pop Machine 
    - The relay module was purchased from Amazon: https://www.amazon.ca/gp/product/B01BY1693A/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&psc=1
    - Using the pinout map (https://pinout.xyz/), the following pins are connected from the Pi to the Relay
    - Pin 2 (5V Power) to Relay VCC
    - Pin 39 (Ground) to Relay GND
    - Pin 11 (GPIO 17) to Relay IN1   (for Vendo coin activation)
    - Pin 13 (GPIO 27) to Relay IN2   (for beverage 1 selection)
    - Pin 15 (GPIO 22) to Relay IN3   (for beverage 2 selection)
    - Pin 12 (GPIO 18) to Relay IN4   (for beverage 3 selection)
    - Pin 16 (GPIO 23) to Relay IN5   (for beverage 4 selection)
    - Pin 33 (GPIO 13) to Relay IN6   (for beverage 5 selection)

3. Install NodeJS on the Pi
    - DO NOT charge ahead and think 'sudo apt-get install' is your friend here. You will get an outdated version and nothing will work (yes, we learned the hard way)
    - Follow this: https://www.instructables.com/id/Install-Nodejs-and-Npm-on-Raspberry-Pi/
    - For our PI3 (referenced above in the Amazon link), we required node-v10.15.3-linux-armv7l.tar.xz
    - Note that the .tx file can be extracted by running  tar -xf node-v10.15.3-linux-armv7l.tar.xz    This was not explained on the instrucables page.
    - reboot
    - Check node and npm version. For our solution, node version was 10.15.3 and npm was 6.4.1

4. Install nGrok - see https://dashboard.ngrok.com
    - Follow the instructions to install ngrok on your Pi and set the auth token    
    - You will need to upgrade to the Basic plan to get a permanent domain, such as popmachine.ngrok.io. Otherwise the URL will change everytime the ngrok service is initialized.

5. Clone this repo on your Pi. We did this in the Desktop folder
    - cd PopMachine
    - npm update
    - npm install

6. Set ngrok and node to start on boot-up of the Pi
    - Using your editor of choice, edit the /etc/rc.local file as sudo. We us vi, so from the command line, sudo vi /etc/rc.local
    - Add the following:
        - sudo /home/pi/Desktop/ngrok/ngrok http -subdomain=popmachine 3000 < /dev/null &
        - sudo node /home/pi/Desktop/PopMachine/server.js < /dev/null &
    - Save and exit file editor

7. Reboot your Pi 

# Step 2: Setup Twilio account and project

1. Log in or create a Twilio account (google if you need assistance)
2. Create a new project
3. Purchase a number and record it
4. For the purchased number, set up Messaging, with the following
    - CONFIGURE WITH to Webhooks, TwiML Bins, Functions, Stuido, or Proxy
    - A MESSAGE COMES IN to Webhook, https://popmachine.ngrok.io/twilio/sms, HTTP POST
    - PRIMARY HANDLER FAILS to empty
5. Click Save


# Step 3: Test
At this point you should be able to send an SMS to your Twilio number and see and hear the relays activate to similate the coin activation and beverage selection.

# Step 4: Debugging
- Remove the starting of the node server and ngrok in /etc/rc.local
- Reboot your Pi
- start the node process manually (sudo node server.js) and the console.log should help diagnose
- start the ngrok process manually in another terminal - you can verify that Twilio is sending POSTs to your node server
