import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.tweetRepository = new TweetRepository();
  }

  async create(modelId, modelType, userId, content) {
    try {
      if (modelType === "Tweet") {
        var commentable = await this.tweetRepository.get(modelId);
      } else if (modelType === "Comment") {
        var commentable = await this.CommentRepository.get(modelId);
      } else {
        throw new Error("wrong modelType");
      }

      if (!commentable) {
        throw new Error("Error, wrong modelId");
      }

      const comment = await this.commentRepository.create({
        content: content,
        userId: userId,
        onModel: modelType,
        commentable: modelId,
        comments: [],
      });

      commentable.comments.push(comment);
      await commentable.save();
      return comment;
    } catch (error) {
      console.log("Something wrong while create at comment-service");
      throw error;
    }
  }
}

export default CommentService;
