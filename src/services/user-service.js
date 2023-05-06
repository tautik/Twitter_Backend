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

  async getUserByEmail(email) {
    console.log(email);
    try {
      const user = await this.userRepository.findBy({ email });
      return user;
    } catch (error) {
      console.log("Something went wrong service getUserByEmail");
      throw error;
    }
  }

  async signin(data) {
    try {
      const user = await this.getUserByEmail(data.email);
      if (!user) {
        throw {
          message: "no user found",
        };
      }

      if (!user.comparePassword(data.password)) {
        throw {
          message: "incorrect password",
        };
      }
      const token = user.genJWT();
      return token;
    } catch (error) {
      console.log("Something went wrong service user login");
      throw error;
    }
  }
}

export default UserService;
