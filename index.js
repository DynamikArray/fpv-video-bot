require("dotenv").config();
var debug = require("debug");
var env = process.env.NODE_ENV || "dev";

const messageControl = require("./lib/messageControl");

const Discord = require("discord.js");
var client = new Discord.Client();

//Fired UP lets go!
client.on("ready", () => {
  console.log("Bot Launched and is running!");
});

client.on("message", message => {
  messageControl(client, message);
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
