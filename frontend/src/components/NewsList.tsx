import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../services/api';
import NewsItem from './NewsItem';
import CategoryFilter from './CategoryFilter';

interface News {
  _id: string;
  title: string;
  description: string;
  author: string;
  status: string;
  publishedAt: string;
}

const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isAdmin, setIsAdmin] = useState(false); // You should get this from your auth context
  const [category, setCategory] = useState<string | null>(null);
  // derive admin from local storage (AuthContext not imported here to keep small change)
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setIsAdmin(parsed.user?.role === 'admin');
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getAllNews();
        const all = response.data.newNews || response.data.newses || [];
        // if not admin, only show published
        const stored = localStorage.getItem('auth');
        const role = stored ? (JSON.parse(stored).user?.role as string) : null;
        const filtered = role === 'admin' ? all : all.filter((n: any) => n.status === 'published');
        setNews(filtered);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = (deletedId: string) => {
    setNews(news.filter(item => item._id !== deletedId));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">News Feed</h2>
        <div className="flex items-center gap-4">
          <CategoryFilter value={category} onChange={setCategory} />
          {isAdmin && (
            <Link to="/admin" className="bg-green-600 text-white px-4 py-2 rounded">Admin</Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.filter(n => !category || (n as any).category === category).map((item) => (
          <NewsItem
            key={item._id}
            news={item}
            isAdmin={isAdmin}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
