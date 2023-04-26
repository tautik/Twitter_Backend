const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    hastags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hastag",
      },
    ],
  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", schema);

module.exports = Tweet;
