import React, { useState, useEffect } from 'react';
import './styles/TrendingNews.css';

const TrendingNews = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchRandomNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
      const data = await response.json();
  
      if (!data.articles) {
        throw new Error('Articles not found in response');
      }
  
      const articles = data.articles;
  
      const validArticles = articles.filter(article => (
        article.urlToImage && article.title && article.description && article.source && article.publishedAt && article.url
      ));
      
      const randomNews = getRandomNews(validArticles, 4);
      setTrendingNews(randomNews);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trending news:', error);
      setLoading(false);
    }
  };
  
  const getRandomNews = (articles, count) => {
    const randomNews = [];
    while (randomNews.length < count && articles.length > 0) {
      const randomIndex = Math.floor(Math.random() * articles.length);
      randomNews.push(articles[randomIndex]);
      articles.splice(randomIndex, 1);
    }
    return randomNews;
  };

  useEffect(() => {
    fetchRandomNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trending-news">
      <h2>Trending News</h2>
      <div className="trending-info-section">
        {trendingNews.map((article, index) => (
          <div key={index} className="trending-info-card">
            <img src={article.urlToImage} alt={article.title} />
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
    </div>
  );
};

export default TrendingNews;
