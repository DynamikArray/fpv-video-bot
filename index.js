require("dotenv").config();
var debug = require("debug");

const Discord = require("discord.js");
var client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot Launched and is running!");
});

client.on("message", message => {
  if (message.author.bot) return; //ignore bot messages
  if (message.channel.type != "text") return message.channel.send("text only!");

  var sender = message.author;
  var msg = message.content.toUpperCase();
  var prefix = "^";

  var regExp = /^.*(?:(?:youtu.be\/|v\/|vi\/|u\/w\/|embed\/)|(?:(?:watch)??v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;

  if ((result = regExp.exec(message))) {
    //Message is of type youtube video
    message.reply(`Video ${result[1]} has been deleted. ${message.author}`);

    message
      .delete()
      .then(msg => console.log(`Video message deleted from ${msg.author}`))
      .catch(console.error);
  }
});

client.login(process.env.discord_token);
