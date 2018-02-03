require("dotenv").config();
require("newrelic");
var debug = require("debug");

//
//  The cahnnel to move message to
var destinationChannel = {
  id: "408351459676127252",
  name: "youtube-videos"
};

//
//  Allowed channels for the video bot to scan
var discordChannels = [
  { id: "407813602821537794", name: "general-chat" },
  { id: "409165863451623429", name: "random-nothingness" },
  { id: "409152804557684746", name: "fpv-livestream-guide" },
  { id: "397911152325165066", name: "testing" }
];

const Discord = require("discord.js");
var client = new Discord.Client();

//Fired UP lets go!
client.on("ready", () => {
  console.log("Bot Launched and is running!");
});

//New messages incoming
client.on("message", message => {
  if (message.author.bot) return; //ignore bot messages

  if (message.channel.type == "dm") {
    //console.log(`A direct message from a ${message.author} is incoming`);
    message.channel.send(
      "I'm sorry i dont respond to messages yet :disappointed: "
    );
    return;
  }

  if (message.channel.type == "text") {
    if (message.channel.id) {
      var validChannel = discordChannels.find(channel => {
        if (channel.id == message.channel.id) {
          return true;
        }
        return false;
      });

      if (validChannel) {
        if (checkMessage(message)) {
          if (sendDM(destinationChannel, message)) {
            moveMessage(destinationChannel, message);
            deleteMSG(message);
          } //end if sendDem
        } //endif checkMessage
      } //end if validChannel
    } //end if message.channel.id
  } //end if messge is text
});

//Check the message for a youtuve video link
function checkMessage(message) {
  //This is a message that meets all the requirements to be scanned and moved
  var msg = message.content.toUpperCase();
  var prefix = "^";
  var regExp = /^.*(?:(?:youtu.be\/|v\/|vi\/|u\/w\/|embed\/)|(?:(?:watch)??v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;

  if ((result = regExp.exec(message))) {
    return true;
  }
  return false;
}

//Send the DM to the sender that we moved there video for them
function sendDM(destChannel, message) {
  var sender = message.author;

  //Reply back to sender as a DM
  sender.send(
    `Your youtube video ${result[0]} has been removed from the #${
      message.channel.name
    }, we have kindly moved it into the #${destChannel.name} instead.`
  );

  return true;
}

//Move this message to the destination channel
function moveMessage(destChannel, message) {
  client.channels
    .get(destChannel.id)
    .send(
      `${message.author} posted this in the wrong channel:  ${message.content}`
    );
}

//
//  deleteMSG - delete incoming message
//
function deleteMSG(message) {
  message
    .delete()
    .then(msg => console.log(`Video message deleted from ${msg}`))
    .catch(console.error);

  return true;
}

//Login to the server!
client.login(process.env.discord_token);

var express = require("express");
var app = express();

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function() {
  console.log("Node app is running at localhost: " + app.get("port"));
});
