const { TweetRepository } = require("../repository/index");

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  async create(data) {
    try {
      const content = data.content;

      const tags = content.match(/#[a-zA-Z0-9_]+/g); // this regex extracts hashtags
      tags = tags.map((tag) => tag.slice(1));
      console.log(tag);

      const tweet = await this.tweetRepository.create(data);
      // todo create hashtags and add here
      /**
       * 1.  bulcreate in mongoose
       * 2. filter title of hashtag based on multiple tags
       * 3. How to add tweet id inside all the hashtags
       */
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TweetService;

/*
    this is my #first #tweet . I am really #excited
*/
