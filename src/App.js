import './App.css';

import React from 'react';
import Canvas from './Canvas';

const App = () => {
  return (
      <div>
          <div className="menuBar">
              <h1>Menu bar stuff goes here</h1>
          </div>
          <div className="buildArea">
          <Canvas />
          <h1 className="toolbox">Toolbox here?</h1>
        </div>
      </div>
  );
};

export default App;
