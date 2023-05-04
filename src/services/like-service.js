import { LikeRespository, TweetRepository } from "../repository/index.js";
import Tweet from "../models/tweet.js";

class LikeService {
  constructor() {
    // Create instances of the Like and Tweet repositories
    this.likeRepository = new LikeRespository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    // Route: /api/v1/likes/toggle?id=modelid&type=Tweet
    console.log(modelId, modelType, userId);

    // Find the likeable model (either a Tweet or a Comment) based on its ID and type
    if (modelType == "Tweet") {
      var likeable = await this.tweetRepository.find(modelId);
    } else if (modelType == "Comment") {
      // TODO: Add logic for handling Comment objects later
    } else {
      throw new Error("Unknown model type");
    }

    // Check if the user has already liked the model
    const exists = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });

    console.log("exists", exists);

    // If the user has already liked the model, remove the like and return false
    if (exists) {
      likeable.likes.pull(exists.id);
      await likeable.save();
      await exists.remove();
      var isAdded = false;

      // If the user has not yet liked the model, add the like and return true
    } else {
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();
      var isAdded = true;
    }

    // Return a boolean indicating whether the like was added or removed
    return isAdded;
  }
}

export default LikeService;
