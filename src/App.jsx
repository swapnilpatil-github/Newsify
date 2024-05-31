
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import CategoryNews from './components/CategoryNews';
import Footer from './components/Footer';
import GoogleLoginButton from './components/GoogleLoginButton';
import SearchResult from './components/SearchResult';
import './App.css'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<GoogleLoginButton />} />
        <Route path='/homepage' element={<Homepage></Homepage>}></Route>
        <Route path="/category/:category" element={<CategoryNews />} />
        <Route path="/search/:query" element={<SearchResult></SearchResult>}></Route>

      </Routes>
      <Footer></Footer>
    </Router>
  );
};

export default App;
