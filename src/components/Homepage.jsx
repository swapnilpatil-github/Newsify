import React from 'react'
import Navbar from './Navbar'
import TrendingNews from './TrendingNews'

 import Categories from './Categories'

function Homepage() {
  return (
    <div className="homepage-container">
      <Navbar />
      <Categories />
      <TrendingNews />
      
    </div>
  )
}

export default Homepage
