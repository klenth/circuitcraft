import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Toolbox from './toolbox/Toolbox';
import Menubar from './menubar/Menubar';
import App from './App';
import Canvas from './canvas/Canvas';
import reportWebVitals from './reportWebVitals';

const Root = () => {
    const [inputNodes, setInputNodes] = useState([]);
    const [outputNodes, setOutputNodes] = useState([]);

    return (
        <React.StrictMode>
            <Menubar />
            <Toolbox setInputNodes={setInputNodes} setOutputNodes={setOutputNodes} />
            <Canvas inputNodes={inputNodes} outputNodes={outputNodes} />
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals();