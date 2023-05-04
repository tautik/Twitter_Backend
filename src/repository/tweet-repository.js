import Tweet from "../models/tweet.js";
import CrudRepository from "./crud-repository.js";

class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }

  async find(id) {
    try {
      // Use Mongoose's populate function to retrieve the likes associated with the tweet
      // The 'path' option specifies which field to populate - in this case, we want to populate the 'likes' field
      const tweet = await Tweet.findById(id).populate({ path: "likes" });

      // Note: populate can only be used with Mongoose queries, not with the output of a query
      // Therefore, we must use Mongoose's findById function to retrieve the tweet and then use populate on the returned query object

      // Return the tweet with the populated likes field
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async getWithComments(id) {
    try {
      const tweet = await Tweet.findById(id)
        .populate({ path: "comments" })
        .lean();
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(offset, limit) {
    try {
      const tweet = await Tweet.find().skip(offset).limit(limit);
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }
}

export default TweetRepository;
