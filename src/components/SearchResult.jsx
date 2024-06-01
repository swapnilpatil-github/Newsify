import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './styles/SearchResult.css'; 

const SearchResult = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(`https://newsapi.org/v2/everything?q=${encodedQuery}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        if (data.articles) {
          setSearchResults(data.articles.slice(0, 8));
        } else {
          console.error('Error fetching news: Articles not found in response');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="search-results-container">
      <button className="back-btn">
        <Link to="/homepage">Go Back</Link>
      </button>
      {loading && <div>Loading...</div>}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          <div className="search-results-grid">
            {searchResults.map((article, index) => (
              <div key={index} className="search-result-card">
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
        </div>
      )}
    </div>
  );
};

export default SearchResult;
