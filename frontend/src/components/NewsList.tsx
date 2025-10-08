import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../services/api';
import NewsItem from './NewsItem';
import CategoryFilter from './CategoryFilter';

interface News {
  _id: string;
  title: string;
  description?: string;
  author?: any;
  status?: string;
  publishedAt?: string;
  category?: string;
}

const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

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
        const all = response.data?.newNews || response.data?.newses || [];
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
    setNews((curr) => curr.filter(item => item._id !== deletedId));
  };

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} className="mb-4">
        <h2 style={{margin:0}}>News Feed</h2>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <CategoryFilter value={category} onChange={setCategory} />
          {isAdmin && (
            <Link to="/admin" className="btn btn-ghost">Admin</Link>
          )}
        </div>
      </div>

      <div className="grid cols-3">
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
