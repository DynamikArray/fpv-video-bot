const assert = require("chai").assert;
const videoBot = require("../lib/videoBot");

describe("No content in Message", function() {
  it("should return false", () => {
    let testMsg = "";
    let result = videoBot.checkMsgForVideo(testMsg);
    assert.equal(result, false);
  });
});

describe("No Url in Message", function() {
  it("should return false", () => {
    let testMsg = { content: "This is just a simple message test" };
    let result = videoBot.checkMsgForVideo(testMsg);
    assert.equal(result, false);
  });
});

describe("Not a youtube Url In a Message", function() {
  it("should return false", () => {
    let testMsg = {
      content:
        "This is my link message https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/27540400_10156301352605572_4586717589164182612_n.jpg?oh=5d01fb69daaba2f0f195554fb78ec068&oe=5AE67197 to somehwere else!"
    };
    let result = videoBot.checkMsgForVideo(testMsg);
    assert.equal(result, false);
  });
});

describe("Only Url as Message", function() {
  it("should return true", () => {
    let testMsg = { content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" };
    let result = videoBot.checkMsgForVideo(testMsg);
    assert.equal(result, true);
  });
});

describe("Url In a Message", function() {
  it("should return true", () => {
    let testMsg = {
      content:
        "This is my video message https://www.youtube.com/watch?v=dQw4w9WgXcQ thanks guys!"
    };
    let result = videoBot.checkMsgForVideo(testMsg);
    assert.equal(result, true);
  });
});

describe("2 Urls In the Message", function() {
  it("should return true", () => {
    let testMsg = {
      content:
        "This is my video message https://www.youtube.com/watch?v=dQw4w9WgXcQ thanks guys!  Oh yeah dont forget this one https://youtu.be/A7MNoyK5f1E"
    };
    let result = videoBot.checkMsgForVideo(testMsg);
    assert.equal(result, true);
  });
});

describe("Lower case in the domain Url of Message", function() {
  it("should return true", () => {
    let testMsg = { content: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" };
    let result = videoBot.checkMsgForVideo(testMsg);
    assert.equal(result, true);
  });
});

describe("Upper casing in the domain Url of Message", function() {
  it("should return true", () => {
    let testMsg = { content: "https://www.YOUTUBE.com/watch?v=dQw4w9WgXcQ" };
    let result = videoBot.checkMsgForVideo(testMsg);
    assert.equal(result, true);
  });
});
