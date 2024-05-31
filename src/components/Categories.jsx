import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/Categories.css';

const Categories = () => {
  const categories = [
    'Top Stories',
    'World News',
    'Business',
    'Technology',
    'Science',
    'Health',
    'Sports',
    'Entertainment',
    'Lifestyle',
    'Opinion'
  ];

  const location = useLocation();
  const currentCategory = location.pathname.split('/')[2];

  return (
    <div className="categories">
      {categories.map((category, index) => (
        <Link 
          key={index} 
          to={`/category/${category}`} 
          className={`category-button ${currentCategory === category ? 'active' : ''}`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
