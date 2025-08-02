const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = async (req, res) => {
  const { content } = req.body;
  const post = new Post({ content, author: req.userId });
  await post.save();
  res.status(201).json(post);
};

exports.getFeed = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'name');
  res.json(posts);
};

exports.getUserPosts = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });
  res.json({ user, posts });
};
