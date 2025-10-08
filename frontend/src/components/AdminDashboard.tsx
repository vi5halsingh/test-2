import { useEffect, useState } from 'react';
import { getAllNews, deleteNews, updateNews } from '../services/api';
import { Link } from 'react-router-dom';

interface News {
  _id: string;
  title: string;
  description: string;
  author: any;
  status: string;
  publishedAt: string;
}

const AdminDashboard = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await getAllNews();
      const all = res.data.newNews || res.data.newses || [];
      setNews(all);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this news?')) return;
    try {
      await deleteNews(id);
      setNews((s) => s.filter(n => n._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const togglePublish = async (id: string, status: string) => {
    const next = status === 'published' ? 'draft' : 'published';
    try {
      await updateNews(id, { status: next });
      setNews((s) => s.map(n => n._id === id ? { ...n, status: next } : n));
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin — Manage News</h2>
        <Link to="/create-news" className="bg-green-600 text-white px-4 py-2 rounded">Create News</Link>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {news.map(n => (
            <div key={n._id} className="p-4 bg-slate-800 rounded">
              <h3 className="font-bold text-lg">{n.title}</h3>
              <p className="text-sm text-gray-300">{n.description?.slice(0, 150)}{n.description?.length > 150 ? '...' : ''}</p>
              <div className="flex items-center gap-2 mt-3">
                <Link className="text-blue-400" to={`/update-news/${n._id}`}>Edit</Link>
                <button onClick={() => togglePublish(n._id, n.status)} className="px-3 py-1 rounded bg-amber-500">{n.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                <button onClick={() => handleDelete(n._id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
