// src/models/story.js
const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: { type: Number, default: 0 },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Story", storySchema);
