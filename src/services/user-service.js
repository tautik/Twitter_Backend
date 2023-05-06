import { UserRepository } from "../repository/index.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      const response = await this.userRepository.create(data);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default UserService;
