const express = require("express");
const connect = require("./config/database");
const app = express();

const TweetRepository = require("./repository/tweet-repository");
const Comment = require("./models/comment");
app.listen(3000, async () => {
  console.log("server started");
  await connect();
  console.log("Mongo db connected");

  const tweetRepo = new TweetRepository();
  const tweet = await tweetRepo.getWithComments("6447bcede0ca6f296627a405");
  console.log(tweet);
});
