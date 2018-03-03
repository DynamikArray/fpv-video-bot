module.exports = {
  //New methods based around the testing scripts
  checkMsgForVideo: function(message) {
    //if content in the message
    if (!message.content) {
      return false;
    }
    var msg = message.content.toLowerCase();
    var regExp = /(https?:\/\/)?(www.)?(youtube.com|youtu.?be)\/.+$/;
    //The results of the regExp.exec are an array of piece or null,
    if (regExp.exec(msg)) {
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
    var roles = (message.member || { roles: [] }).roles;
    var hasAllowedRole = false;

    if (!roles) return hasAllowedRole;

    hasAllowedRole = roles.find(role => {
      return (
        role.name == "Staff" ||
        role.name == "Admin" ||
        role.name == "Squad Leader"
      );
    });
    return hasAllowedRole;
    //return hasAllowedRole;
  },

  //Check the message for a youtuve video link
  checkMessage: function(message) {
    //This is a message that meets all the requirements to be scanned and moved
    var msg = message.content.toUpperCase();
    var prefix = "^";
    //var regExp = /^.*(?:(?:youtu.be\/|v\/|vi\/|u\/w\/|embed\/)|(?:(?:watch)??v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
    var regExp = /(https?:\/\/)?(www.)?(youtube.com|youtu.?be)\/.+$/;

    return result == regExp.exec(message);
  },

  //Send the DM to the sender that we moved there video for them
  sendDM: function(destChannel, message) {
    var sender = message.author;

    //Reply back to sender as a DM
    sender.send(
      `Your message containing a youtube video link has been removed from the #${
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
