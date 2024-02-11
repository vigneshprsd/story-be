// src/controllers/storyController.js
const Story = require("../models/story");

const getStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .sort({ createdAt: -1 })
      .populate("author", "username");
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const uploadStory = async (req, res) => {
  // Only allow story upload for admin user
  console.log(req.user);
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Permission denied" });
  }

  const { title, content } = req.body;

  try {
    const newStory = new Story({ title, content, author: req.user.id });
    await newStory.save();
    res.json({ message: "Story uploaded successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const likeStory = async (req, res) => {
  const { storyId } = req.body;

  try {
    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ message: "Story not found" });

    story.likes++;
    await story.save();

    res.json({ message: "Liked successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const commentStory = async (req, res) => {
  console.log("kjhgfccjhgvcvijhgvjhvjhbvbjhbv ");
  const { storyId, text } = req.body;

  try {
    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ message: "Story not found" });

    story.comments.push({ user: req.user.id, text });
    await story.save();

    res.json({ message: "Comment added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getStories, uploadStory, likeStory, commentStory };
