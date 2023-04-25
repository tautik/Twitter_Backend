const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userMail: {
      type: String,
    },
  }
  //   { timestamps: true }
);

const Tweet = mongoose.model("Tweet", schema);

module.exports = Tweet;
