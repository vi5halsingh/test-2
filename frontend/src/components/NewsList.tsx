import { useState, useEffect } from 'react';
import { getAllNews } from '../services/api';
import NewsItem from './NewsItem'

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getAllNews();
        setNews(response.data.newses);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item) => (
          <NewsItem key={item._id} news={item} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;