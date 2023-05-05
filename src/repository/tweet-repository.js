import Tweet from "../models/tweet.js";
import CrudRepository from "./crud-repository.js";

class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }

  async find(id) {
    try {
      //populate used--> shows all the detail, path:likes indicates show only path not all
      const tweet = await Tweet.findById(id).populate({ path: "likes" });
      //Tweet.findById(id).populate({ path: "likes" });--> mongooes query object where populate can be applied
      //it returns in tweet--> it contains mongoose final output, here populate cant be applied
      //populate is exclusive for mongodb/mongoose query object
      return tweet;
    } catch (error) {
      console.log(error);
    }
  }

  async getWithComments(id) {
    try {
      const tweet = await Tweet.findById(id)
        .populate({
          path: "comments",
          populate: {
            path: "comments",
          },
        })
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
