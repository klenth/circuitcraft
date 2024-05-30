import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Toolbox from './toolbox/Toolbox';
import Menubar from './menubar/Menubar';
import Canvas from './canvas/Canvas';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Menubar />
    <Canvas />
    <Toolbox />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
