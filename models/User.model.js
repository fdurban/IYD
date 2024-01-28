const { Schema, model } = require("mongoose")
const Card = require("./Card.model")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"]
    },
    email: {
      type: String,
      unique: [true, "username already in the database"],
      trim: true
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png"
    },
    description: {
      type: String,
      default: "Description does not exist"
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },
    cards: [{
      type: Schema.Types.ObjectId,
      ref: "Card",
    }],
  },
  {
    timestamps: true
  }
);


const User = model("User", userSchema)

module.exports = User
