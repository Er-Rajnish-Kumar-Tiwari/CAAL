const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createPost, getFeed, getUserPosts } = require('../controlls/postController');
const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getFeed);
router.get('/user/:id', getUserPosts);

module.exports = router;
