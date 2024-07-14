import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Toolbox from './toolbox/Toolbox';
import Menubar from './menubar/Menubar';
import App from './App';
import Canvas from './canvas/Canvas';
import reportWebVitals from './reportWebVitals';
import { RotationProvider } from './canvas/RotationContext';

const initialNodes = [];
const initialEdges = [];

const Root = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const addNode = useCallback((newNode) => {
        setNodes((prevNodes) => [...prevNodes, newNode]);
    }, []);

    const handleLabelChange = (id, newLabel) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) => {
                if (node.id === id) {
                    return { ...node, data: { ...node.data, label: newLabel } };
                }
                return node;
            })
        );
    };

    return (
        <React.StrictMode>
            <RotationProvider>
                <Menubar />
                <Toolbox addNode={addNode} handleLabelChange={handleLabelChange} />
                <Canvas nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} handleLabelChange={handleLabelChange} />
            </RotationProvider>
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals();