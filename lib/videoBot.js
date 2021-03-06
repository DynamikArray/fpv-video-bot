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
  checkRole: function(message, roleList) {
    var roles = (message.member || { roles: [] }).roles;
    var hasAllowedRole = false;

    if (!roles) return hasAllowedRole;

    hasAllowedRole = roles.find(role => {
      //return the role if it meets the list
      return roleList.find(perm => {
        return perm == role.name;
      });
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
      `Your message containing a youtube video link has been removed from #${
        message.channel.name
      }, channel.  Dont, worry we have just moved it into the #${
        destChannel.name
      } channel instead.`
    );

    return true;
  },

  //Move this message to the destination channel
  moveMessage: function(client, destChannel, message, callback) {
    client.channels
      .get(destChannel.id)
      .send(
        `${message.author} posted this in the wrong channel:  ${
          message.content
        }`
      )
      .then(message => {
        callback(message);
      })
      .catch(console.error);
  },

  addThumbs: function(message) {
    message.react("👍").catch(err => {
      //console.log(err);
    });
    message.react("👎").catch(err => {
      //console.log(err);
    });
  },

  addPropNutsRating: function(message) {
    //return false;
    /*  PROP NUTE EMOJOIS - DISABLED FOR NOW
    const propnuts = message.guild.emojis.filter(emoji => {
      if (emoji.name.indexOf("Propnuts_") !== -1) {
        return emoji;
      }
    });

    propnuts.sort().map(emoji => {
        message.react(emoji.id);
    });
    */
  },

  //
  //  deleteMSG - delete incoming message
  //
  deleteMSG: function(message) {
    message.delete().catch(error => console.log(error));
  }
}; //end exports
