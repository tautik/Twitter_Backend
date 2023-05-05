// Import necessary repositories
import { TweetRepository, HashtagRepository } from "../repository/index.js";

// Create a new TweetService class to handle tweet creation and hashtag association
class TweetService {
  constructor() {
    // Initialize instances of the repositories
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  // Create a new tweet and associate it with the appropriate hashtags
  async create(data) {
    try {
      const content = data.content;
      let tags = content.match(/#[a-zA-Z0-9_]+/g);
      if (tags) {
        tags = tags.map((tag) => tag.slice(1).toLowerCase());
      } else {
        tags = [];
      }
      // this regex extracts hashtags // Extract hashtags from tweet content

      // Save the tweet to the database
      const tweet = await this.tweetRepository.create(data);
      console.log("Enetring here", tweet, data);
      // Find hashtags that already exist in the database
      let alreadyPresentTags = await this.hashtagRepository.findByName(tags);

      // Get titles of the existing hashtags
      let titleOfPresenttags = alreadyPresentTags.map((tags) => tags.title);

      // Filter out new hashtags that don't already exist
      let newTags = tags.filter((tag) => !titleOfPresenttags.includes(tag));

      // Create new hashtag objects for the new tags and associate them with the tweet
      newTags = newTags.map((tag) => {
        return { title: tag, tweets: [tweet.id] };
      });

      // Save the new hashtag objects to the database
      await this.hashtagRepository.bulkCreate(newTags);

      // Associate the existing hashtag objects with the tweet
      alreadyPresentTags.forEach((tag) => {
        tag.tweets.push(tweet.id);
        tag.save();
      });

      // Return the created tweet
      return tweet;
    } catch (error) {
      console.log("Error at service layer", error);
      throw error;
    }
  }

  async get(tweetId) {
    const tweet = await this.tweetRepository.getWithComments(tweetId);
    return tweet;
  }
}

// Export the TweetService class
export default TweetService;
/*
    this is my #first #tweet . I am really #excited
*/
