import { Link } from 'react-router-dom';

interface News {
  _id: string;
  title: string;
  description: string;
  author: string;
  status: string;
  publishedAt: string;
}

interface Props {
  news: News;
}

const NewsItem = ({ news }: Props) => {
  return (
    <div className="border rounded p-4">
      <h3 className="text-xl font-bold">{news.title}</h3>
      <p>{news.description}</p>
      <p className="text-sm text-gray-500">By {news.author}</p>
      <p className="text-sm text-gray-500">Status: {news.status}</p>
      <Link to={`/update-news/${news._id}`} className="text-blue-500">Edit</Link>
    </div>
  );
};

export default NewsItem;