import express from "express";
import { connect } from "./config/database.js";
const app = express();
import TweetService from "./service/tweet-service.js";
app.listen(3000, async () => {
  console.log("server started");
  await connect();
  console.log("Mongo db connected");
  const tweetService = TweetService;
  // const tweet = await this.TweetService.create({content:})
});
