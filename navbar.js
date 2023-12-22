import React from 'react';

function Navbar() {
  return (
    <div className="navbar">
      <a href="http://lactiowa.org/">LACT</a>
      <a href="https://iti.uiowa.edu/labs/laboratory-advanced-construction-technology">ITI</a>
      <a href="https://www.sustainablehighways.org/">INVEST</a>
      {/* Add the "Rating Criteria" tab here */}
      <a href="#">Rating Criteria</a>
    </div>
  );
}

export default Navbar;
