const mongoose = require("mongoose");

const hastagSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tweets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },
  { timestamps: true }
);

const Hastag = mongoose.model("Hastag", hastagSchema);

module.exports = Hastag;
