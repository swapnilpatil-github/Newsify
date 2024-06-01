import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Categories from './Categories';
import './styles/CategoryNews.css';

const CategoryNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
        const data = await response.json();
        const filteredArticles = data.articles
          .filter(article => 
            article.urlToImage && 
            article.title && 
            article.description && 
            article.source && 
            article.publishedAt && 
            article.url
          )
          .slice(0, 8);

        setArticles(filteredArticles);
        setLoading(false);
      } catch (error) {
        setError('Error fetching news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="category-news-page">
      <button className="back-btn">
        <Link to="/homepage">Go Back</Link>
      </button>
      <Categories />
      <div className="category-news">
        <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        {articles.length > 0 ? (
          <div className="category-news-grid">
            {articles.map((article, index) => (
              <div key={index} className="category-news-card">
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                <div className="content">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <p><strong>Source:</strong> {article.source.name}</p>
                  <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No news available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryNews;
