import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const encryptedPassword = bcrypt.hashSync(user.password, SALT);
  user.password = encryptedPassword;
  next();
});

userSchema.methods.comparePassword = function compare(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.genJWT = function generate() {
  try {
    const token = jwt.sign(
      { id: this.id, email: this.email },
      "twitter_secret",
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    return token;
  } catch (error) {
    console.log("Token not able to create", error);
    throw error;
  }
};

const User = mongoose.model("User", userSchema);

export default User;
