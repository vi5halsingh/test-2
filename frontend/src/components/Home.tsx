import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../services/api';
import NewsItem from './NewsItem';

interface News {
  _id: string;
  title: string;
  description: string;
  author: any;
  status: string;
  publishedAt: string;
  category?: string;
}

const DEFAULT_NEWS: News[] = [
  {
    _id: 'sample-1',
    title: 'Welcome to News App',
    description: 'This is a sample featured article. Use the admin panel to create news, manage categories and publish content.',
    author: { username: 'System' },
    status: 'published',
    publishedAt: new Date().toISOString(),
    category: 'Technology'
  },
  {
    _id: 'sample-2',
    title: 'Getting Started',
    description: 'Register an account and login as admin to manage news items. This app uses JWT authentication.',
    author: { username: 'System' },
    status: 'published',
    publishedAt: new Date().toISOString(),
    category: 'Business'
  },
  {
    _id: 'sample-3',
    title: 'Tailwind + React',
    description: 'The frontend is built with React + TypeScript and styled with TailwindCSS for rapid UI development.',
    author: { username: 'System' },
    status: 'published',
    publishedAt: new Date().toISOString(),
    category: 'Technology'
  }
];

const Home = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getAllNews();
        const all = res?.data?.newNews || res?.data?.newses || [];
        if (!all || all.length === 0) {
          setNews(DEFAULT_NEWS);
        } else {
          // sort by publishedAt desc
          const sorted = all.slice().sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
          setNews(sorted as News[]);
        }
      } catch (e) {
        console.error(e);
        setNews(DEFAULT_NEWS);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const featured = news[0];
  const latest = news.slice(1, 7);

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-indigo-600 to-pink-600 rounded-lg p-8 text-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-extrabold mb-3">Latest Headlines</h1>
            <p className="text-slate-100/90 mb-4">Stay informed with the most important news. Filter by category, like posts, and explore more.</p>
            <div className="flex gap-4">
              <Link to="/news" className="bg-white text-indigo-700 px-5 py-2 rounded font-semibold">Browse all news</Link>
              <Link to="/register" className="border border-white text-white px-5 py-2 rounded">Get started</Link>
            </div>
          </div>
          <div className="md:w-1/2">
            {featured ? (
              <div className="bg-white/10 p-6 rounded">
                <h2 className="text-2xl font-bold">{featured.title}</h2>
                <p className="text-sm text-slate-200 mt-2">{featured.description?.slice(0, 160)}{featured.description && featured.description.length > 160 ? '...' : ''}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs text-slate-200">By {typeof featured.author === 'string' ? featured.author : featured.author?.username || 'Unknown'}</span>
                  <span className="text-xs text-slate-200">| {new Date(featured.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ) : <div className="bg-white/10 p-6 rounded">Loading featured...</div>}
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Latest News</h3>
          <Link to="/news" className="text-sm text-blue-400">View all</Link>
        </div>

        {loading ? <p>Loading...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latest.length === 0 ? (
              DEFAULT_NEWS.slice(0,3).map(n => (
                <div key={n._id} className="bg-slate-800 p-4 rounded">
                  <h4 className="font-bold">{n.title}</h4>
                  <p className="text-sm text-gray-300 mt-2">{n.description}</p>
                </div>
              ))
            ) : (
              latest.map(n => (
                <div key={n._id} className="bg-slate-800 p-4 rounded">
                  <h4 className="font-bold">{n.title}</h4>
                  <p className="text-sm text-gray-300 mt-2">{n.description?.slice(0,120)}{n.description && n.description.length > 120 ? '...' : ''}</p>
                  <div className="mt-3">
                    <Link to="/news" className="text-sm text-blue-400">Read more</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
