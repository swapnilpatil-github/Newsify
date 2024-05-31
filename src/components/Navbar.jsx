import React from 'react'
import Search from './Search'
import Weather from './Weather'
import './styles/Navbar.css'
function Navbar() {
  return (
   <div className="main">
    <div className="left">
      <h3>NEWSIFY</h3>
    </div>
    <div className="middle">
        <Search></Search>
    </div>
    <div className="right">
        <Weather></Weather>
    </div>
   </div>
  )
}

export default Navbar