import React from 'react';
import { Link } from 'react-router-dom';
import { deleteNews } from '../services/api';
import { updateNews } from '../services/api';

interface Author {
  _id?: string;
  username?: string;
}

interface News {
  _id: string;
  title: string;
  description: string;
  author: string | Author;
  status: string;
  publishedAt: string;
}

interface Props {
  news: News;
  isAdmin: boolean;
  onDelete: (id: string) => void;
}

const NewsItem = ({ news, isAdmin, onDelete }: Props) => {
  const [liked, setLiked] = React.useState(false);
  const [isAdminLocal, setIsAdminLocal] = React.useState(false);
  const handleDelete = async () => {
    try {
      await deleteNews(news._id);
      onDelete(news._id);
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleLike = async () => {
    const next = !liked;
    setLiked(next);
    try {
      // persist locally
      const stored = JSON.parse(localStorage.getItem('likes') || '{}');
      stored[news._id] = next;
      localStorage.setItem('likes', JSON.stringify(stored));
    } catch (e) { }
    try {
      // attempt to call backend if implemented; otherwise it's local only
      // await likeNews(news._id);
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    const stored = localStorage.getItem('likes');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLiked(!!parsed[news._id]);
      } catch (e) {}
    }
    const auth = localStorage.getItem('auth');
    if (auth) {
      try { setIsAdminLocal(JSON.parse(auth).user?.role === 'admin'); } catch(e){}
    }
  }, [news._id]);

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6 hover:bg-slate-700 transition duration-300">
      <h3 className="text-xl font-bold mb-2">{news.title}</h3>
      <p className="text-gray-300 mb-4">{news.description}</p>
      <div className="text-sm text-gray-400">
        <p>By {typeof news.author === 'string' ? news.author : news.author?.username || 'Unknown'}</p>
        <p>Status: {news.status}</p>
      </div>
      <div className="mt-3">
        <button onClick={handleLike} className={`px-3 py-1 rounded-md ${liked ? 'bg-red-600' : 'bg-slate-700'}`}>
          {liked ? 'Liked' : 'Like'}
        </button>
      </div>
      {isAdminLocal && (
        <div className="mt-4 flex gap-3">
          <Link
            to={`/update-news/${news._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Edit
          </Link>
          <button onClick={async () => {
            const next = news.status === 'published' ? 'draft' : 'published';
            try { await updateNews(news._id, { status: next }); window.location.reload(); } catch(e){console.error(e)}
          }} className="px-3 py-1 rounded bg-amber-500">{news.status === 'published' ? 'Unpublish' : 'Publish'}</button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsItem;
