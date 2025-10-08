import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNews, updateNews } from '../services/api';

const UpdateNews = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: ''
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews(id!);
        const news = response.data;
        setFormData({
          title: news.title,
          description: news.description,
          status: news.status
        });
      } catch (error) {
        console.error('Error fetching news:', error);
        navigate('/');
      }
    };

    fetchNews();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateNews(id!, formData);
      navigate('/');
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Update News</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-slate-800 rounded-md p-2 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-800 rounded-md p-2 text-white h-32"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full bg-slate-800 rounded-md p-2 text-white"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
        >
          Update News
        </button>
      </form>
    </div>
  );
};

export default UpdateNews;