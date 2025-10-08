import React from 'react';
import { Link } from 'react-router-dom';
import { deleteNews, updateNews } from '../services/api';

interface Author {
  _id?: string;
  username?: string;
}

interface News {
  _id: string;
  title: string;
  description?: string;
  author?: string | Author;
  status?: string;
  publishedAt?: string;
}

interface Props {
  news: News;
  isAdmin?: boolean;
  onDelete: (id: string) => void;
}

const NewsItem = ({ news, isAdmin, onDelete }: Props) => {
  const [liked, setLiked] = React.useState(false);
  const [isAdminLocal, setIsAdminLocal] = React.useState<boolean>(!!isAdmin);
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
    <div className="card">
      <h3 className="card-title">{news.title}</h3>
      <p className="card-desc">{news.description}</p>
      <div className="meta" style={{ marginTop: 8 }}>
        <span>By {typeof news.author === 'string' ? news.author : news.author?.username || 'Unknown'}</span>
        {news.publishedAt && <span style={{ marginLeft: 8 }}>| {new Date(news.publishedAt).toLocaleDateString()}</span>}
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={handleLike} className={`btn ${liked ? 'btn-primary' : ''}`}>
          {liked ? 'Liked' : 'Like'}
        </button>
      </div>
      {isAdminLocal && (
        <div className="admin-controls" style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <Link to={`/update-news/${news._id}`} className="btn">Edit</Link>
          <button onClick={async () => {
            const next = news.status === 'published' ? 'draft' : 'published';
            try { await updateNews(news._id, { status: next }); window.location.reload(); } catch(e){console.error(e)}
          }} className="btn">{news.status === 'published' ? 'Unpublish' : 'Publish'}</button>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      )}
    </div>
  );
};

export default NewsItem;
