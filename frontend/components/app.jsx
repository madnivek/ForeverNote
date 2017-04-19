import React from 'react';
import NavBarContainer from './dashboard/nav/nav_bar_container';


const App = ({children}) => (
  <div className="app-container">
    <NavBarContainer />
    { children }
  </div>
);

export default App;
