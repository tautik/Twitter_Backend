import mongoose from "mongoose";

export const connect = async () => {
  await mongoose.connect("mongodb://mongo:27017/twitter_Dev");
};
