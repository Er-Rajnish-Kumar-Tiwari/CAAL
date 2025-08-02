import React, { useEffect, useState } from 'react';
import API from '../services/api';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await API.post('/posts', { content });
      setContent('');
      fetchPosts();
    } catch (err) {
      console.error('Error posting:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Create a New Post</h2>

        <form onSubmit={handlePost} className="space-y-4">
          <textarea
            placeholder="What's on your mind?"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none shadow-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition-all"
          >
            Post
          </button>
        </form>
      </div>

      <div className="max-w-3xl mx-auto mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Recent Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts yet.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
}
