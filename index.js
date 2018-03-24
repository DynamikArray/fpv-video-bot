require("dotenv").config();
var debug = require("debug");
var env = process.env.NODE_ENV || "dev";

const videoBot = require("./lib/videoBot");

//  Allowed channels for the video bot to scan
var discordChannels = [
  { id: "407813602821537794", name: "general-chat" },
  { id: "409165863451623429", name: "random-nothingness" },
  { id: "409152804557684746", name: "fpv-livestream-guide" },
  { id: "410407752335360000", name: "fpv-topic-of-the-day" },
  { id: "420395494624460820", name: "picture-battles" },
  { id: "425138828039159809", name: "fun-and-games" }
  //{ id: "397911152325165066", name: "testing" }  this is a staff channel and probally doesnt need moderation
];
//

//
//  The cahnnel to move message to
var destinationChannel = {
  id: "408351459676127252",
  name: "youtube-videos"
};

//for development have it write respones to testing
if (env == "dev") {
  //change destinationChannel for testing output
  destinationChannel = {
    id: "397911152325165066",
    name: "testing"
  };
}

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
      "I'm sorry i dont respond to messages yet :disappointed:  "
    );
    return;
  }

  //NOT A BOT OR A DM
  //Make sure its text msg
  //then check if its a video
  //if video then check channel and privledges
  // if fails checks then move
  // add prop nut rating

  if (message.channel.type == "text") {
    if (videoBot.checkMsgForVideo(message)) {
      videoBot.addThumbs(message);

      if (message.channel.id) {
        var validChannel = discordChannels.find(channel => {
          if (channel.id == message.channel.id) {
            return true;
          }
          return false;
        });

        if (validChannel) {
          if (!videoBot.checkRole(message)) {
            if (videoBot.sendDM(destinationChannel, message)) {
              videoBot.moveMessage(
                client,
                destinationChannel,
                message,
                botMessage => {
                  videoBot.addThumbs(botMessage);
                }
              );
              videoBot.deleteMSG(message);
            } //end if sendDem
          } //end role check
        } //end vaid channel
      }
    } //end if Video Msg
  }
});

//Login to the server!
client.login(process.env.discord_token);

var express = require("express");
var app = express();

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), function() {
  console.log("Node app is running at localhost: " + app.get("port"));
});

var http = require("http");
setInterval(function() {
  http.get("http://fpv-video-bot.herokuapp.com");
}, 300000); // every 5 minutes (300000)
