module.exports = {
  //New methods based around the testing scripts
  checkMsgForVideo: function(message) {
    //if content in the message
    if (!message.content) {
      return false;
    }
    var msg = message.content.toLowerCase();
    //var regExp = /^.*(?:(?:youtu.be\/|v\/|vi\/|u\/w\/|embed\/)|(?:(?:watch)??v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
    var regExp = /(https?:\/\/)?(www.)?(youtube.com|youtu.?be)\/.+$/;
    if ((result = regExp.exec(msg))) {
      return true;
    }
    return false;
  },

  // - V1 of this before testing was added.

  //
  //
  //
  //Check our users role
  checkRole: function(message) {
    var roles = (message.member || {}).roles;
    var hasAllowedRole = false;
    //ROLE CHECK

    if (roles) {
      hasAllowedRole = roles.find(role => {
        if (role.name == "Staff" || role.name == "Admin") {
          return true;
        }
        return false;
      });
    }
    if (hasAllowedRole) {
      return true;
    }
    return false;
    //return hasAllowedRole;
  },

  //Check the message for a youtuve video link
  checkMessage: function(message) {
    //This is a message that meets all the requirements to be scanned and moved
    var msg = message.content.toUpperCase();
    var prefix = "^";
    //var regExp = /^.*(?:(?:youtu.be\/|v\/|vi\/|u\/w\/|embed\/)|(?:(?:watch)??v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
    var regExp = /(https?:\/\/)?(www.)?(youtube.com|youtu.?be)\/.+$/;

    if ((result = regExp.exec(message))) {
      return true;
    }
    return false;
  },

  //Send the DM to the sender that we moved there video for them
  sendDM: function(destChannel, message) {
    var sender = message.author;

    //Reply back to sender as a DM
    sender.send(
      `Your youtube video ${result[0]} has been removed from the #${
        message.channel.name
      }, we have kindly moved it into the #${destChannel.name} instead.`
    );

    return true;
  },

  //Move this message to the destination channel
  moveMessage: function(client, destChannel, message) {
    client.channels
      .get(destChannel.id)
      .send(
        `${message.author} posted this in the wrong channel:  ${
          message.content
        }`
      );
  },

  //
  //  deleteMSG - delete incoming message
  //
  deleteMSG: function(message) {
    message
      .delete()
      .then()
      .catch(console.error);

    return true;
  }
}; //end exports
