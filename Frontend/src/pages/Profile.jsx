import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(`/posts/user/${id}`);
      setUser(res.data.user);
      setPosts(res.data.posts);
    };
    fetchData();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          {/* Placeholder Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl font-bold">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 mt-2">{user.bio || "No bio provided."}</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-gray-800">Posts</h3>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white shadow-md rounded-lg p-5 mb-4">
            <p className="text-gray-800 text-base">{post.content}</p>
            <div className="text-sm text-gray-500 mt-3">
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
