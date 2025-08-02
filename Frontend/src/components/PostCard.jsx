import React from 'react';

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-transform duration-300 hover:scale-[1.02]">
      {/* Top Section: Author Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold uppercase">
            {post.user?.name?.charAt(0) || 'A'}
          </div>
          <div className="text-sm">
            <p className="text-gray-800 font-semibold">{post.user?.name || 'Anonymous'}</p>
            <p className="text-gray-500 text-xs">{post.user?.email || 'unknown@email.com'}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Post Content */}
      <div className="border-t pt-4">
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          {post.content}
        </p>
      </div>
    </div>
  );
}
