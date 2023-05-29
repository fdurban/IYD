const { Schema, model } = require("mongoose");
const Card = require("./Card.model");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"]
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    profileImage: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png"
    },
    description: {
      type: String,
      default: "Description does not exist"
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    cards: {
      type: Schema.Types.ObjectId,
      ref: "Card",
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
