// Import necessary repositories
const { TweetRespository, HashtagRepository } = require("../repository/index");

// Create a new TweetService class to handle tweet creation and hashtag association
class TweetService {
  constructor() {
    // Initialize instances of the repositories
    this.tweetRepository = new TweetRespository();
    this.hashtagRepository = new HashtagRepository();
  }

  // Create a new tweet and associate it with the appropriate hashtags
  async create(data) {
    const content = data.content;
    const tags = content
      .match(/#[a-zA-Z0-9_]+/g)
      .map((tag) => tag.substring(1)); // Extract hashtags from tweet content

    // Save the tweet to the database
    const tweet = await this.tweetRepository.create(data);

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
  }
}

// Export the TweetService class
module.exports = TweetService;

/*
    this is my #first #tweet . I am really #excited
*/
