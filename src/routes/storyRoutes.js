// src/routes/storyRoutes.js
const express = require("express");
const {
  getStories,
  uploadStory,
  likeStory,
  commentStory,
} = require("../controllers/storyController");
const { authenticate } = require("../../config/middleware");

const router = express.Router();

// Swagger documentation
/**
 * @swagger
 * /stories:
 *   get:
 *     summary: Get all stories
 *     tags:
 *       - Stories
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
router.post("/stories", getStories);

/**
 * @swagger
 * /stories/upload:
 *   post:
 *     summary: Upload a new story (only for admin userc)
 *     tags:
 *       - Stories
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 */
router.post("/stories/upload", authenticate, uploadStory);

/**
 * @swagger
 * /stories/like/{storyId}:
 *   post:
 *     summary: Like a story
 *     tags:
 *       - Stories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/stories/like", authenticate, likeStory);

/**
 * @swagger
 * /stories/comment/{storyId}:
 *   post:
 *     summary: Comment on a story
 *     tags:
 *       - Stories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: storyId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.post("/stories/comment", authenticate, commentStory);

module.exports = router;
