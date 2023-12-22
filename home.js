import React from 'react';
import './App.css';
import ScornLogo from './SCORN_Logo.png';
import Navigation from './navbar'; // Import the Navigation component
import Rating from './ratings'; // Import the Rating component

function Home() {
  return (
    <div>
      <div className="header">
        <h1>Sustainability Co-Operative Rating Number</h1>
        <p>The Laboratory for Advanced Construction Technology (LACT)</p>
      </div>
      <Navigation /> {/* Use the Navigation component */}
      <div className="row">
        <div className="side">
          <h1>SCORN</h1>
          <div className="img">
            <img
              src={ScornLogo}
              alt="SCORN Logo"
              style={{ height: '100%', width: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className="main">
          {/* Include the Rating component */}
          <Rating />
        </div>
      </div>

      <div className="footer">
        <p>&copy; {new Date().getFullYear()} SCORN</p>
      </div>
    </div>
  );
}

export default Home;
