const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
  user: {
    type: Schema.type.ObjectId,
    ref: "users",
  },
  text: {
    type: String,
    req: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.type.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.type.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        req: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Schema = mongoose.model("post", postSchema);
