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
  },
  { timestamps: true }
);

export default Comment = mongoose.model("Comment", schema);
