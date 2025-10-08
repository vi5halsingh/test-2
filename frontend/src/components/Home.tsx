import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNews } from '../services/api';

interface News {
  _id: string;
  title: string;
  description?: string;
  author?: any;
  status?: string;
  publishedAt?: string;
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
    title: 'React + Manual CSS',
    description: 'The frontend now uses plain CSS and React components — Tailwind removed and replaced with handcrafted styles.',
    author: { username: 'System' },
    status: 'published',
    publishedAt: new Date().toISOString(),
    category: 'Technology'
  }
];

const Home: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await getAllNews();
        const all = res?.data?.newNews || res?.data?.newses || [];
        if (!all || all.length === 0) setNews(DEFAULT_NEWS);
        else {
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
    <div>
      <section className="hero">
        <div className="container" style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 380px' }}>
            <h1>Latest Headlines</h1>
            <p>Stay informed with the most important news. Filter by category, like posts, and explore more.</p>
            <div style={{ marginTop: 12 }}>
              <Link to="/news" className="btn btn-ghost" style={{ marginRight: 8 }}>Browse all news</Link>
              <Link to="/register" className="btn btn-ghost">Get started</Link>
            </div>
          </div>

          <div style={{ flex: '1 1 380px' }}>
            {featured ? (
              <div className="card">
                <h2 className="card-title">{featured.title}</h2>
                <p className="card-desc">{featured.description?.slice(0, 160)}{featured.description && featured.description.length > 160 ? '...' : ''}</p>
                <div className="meta">By {typeof featured.author === 'string' ? featured.author : featured.author?.username || 'Unknown'} | {featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString() : ''}</div>
              </div>
            ) : (
              <div className="card">Loading featured...</div>
            )}
          </div>
        </div>
      </section>

      <section className="mb-4">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Latest News</h3>
          <Link to="/news" className="nav-link">View all</Link>
        </div>

        {loading ? <p>Loading...</p> : (
          <div className="grid cols-3">
            {latest.length === 0 ? (
              DEFAULT_NEWS.slice(0, 3).map((n) => (
                <div key={n._id} className="card">
                  <h4 className="card-title">{n.title}</h4>
                  <p className="card-desc">{n.description}</p>
                </div>
              ))
            ) : (
              latest.map((n) => (
                <div key={n._id} className="card">
                  <h4 className="card-title">{n.title}</h4>
                  <p className="card-desc">{n.description?.slice(0, 120)}{n.description && n.description.length > 120 ? '...' : ''}</p>
                  <div style={{ marginTop: 12 }}>
                    <Link to="/news" className="nav-link">Read more</Link>
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
