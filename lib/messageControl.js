const videoBot = require("./videoBot");

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

//  The cahnnel to move message to
var destinationChannel = {
  id: "408351459676127252",
  name: "youtube-videos"
};

const roleList = [
  "Admin",
  "Staff",
  "Squad Captain",
  "Squad Member",
  "Squad Leader"

  //"Squad Recruit"
];

//for development have it write respones to testing
/*
if (env == "dev") {
  //change destinationChannel for testing output
  destinationChannel = {
    id: "397911152325165066",
    name: "testing"
  };
}
*/

module.exports = (client, message) => {
  if (message.author.bot) return; //ignore bot messages

  if (message.channel.type == "dm") {
    //console.log(`A direct message from a ${message.author} is incoming`);
    message.channel.send(
      "I'm sorry i dont respond to messages yet :disappointed: "
    );
    return;
  }

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
          if (!videoBot.checkRole(message, roleList)) {
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

      //
      //
    } //end if Video Msg
  }
};
