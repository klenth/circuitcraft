import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Toolbox from './toolbox/Toolbox';
import Menubar from './menubar/Menubar';
import Canvas from './canvas/Canvas';
import reportWebVitals from './reportWebVitals';
import { RotationProvider } from './canvas/RotationContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';


const initialNodes = [
    /*{ id: 'AND-1', type: 'ANDGateNode', position: { x: 0, y: -40 } },
    { id: 'OR-1', type: 'ORGateNode', position: { x: -50, y: 100 } },
    { id: 'XOR-1', type: 'XORGateNode', position: { x: 100, y: 100 } },
    { id: 'NOR-1', type: 'NORGateNode', position: { x: -200, y: 100 } },
    { id: 'NAND-1', type: 'NANDGateNode', position: { x: -150, y: -40 } },
    { id: 'NOT-1', type: 'NOTGateNode', position: { x: 150, y: -40 } },
    { id: 'XNOR-1', type: 'XNORGateNode', position: { x: 250, y: 100 } },*/
];

const initialEdges = [
    /*{ id: 'e1-2', source: 'AND-1', target: 'OR-1', type: 'CircuitEdge', style: { stroke: 'red' } },
    { id: 'e3-6', source: 'XOR-1', target: 'NOT-1', type: 'CircuitEdge', style: { stroke: 'green' } },
    { id: 'e4-5', source: 'NAND-1', target: 'NOR-1', type: 'CircuitEdge', style: { stroke: 'blue' } }*/
];

const Root = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const addNode = useCallback((newNode) => {
        setNodes((prevNodes) => [...prevNodes, newNode]);
    }, []);

    return (
        <React.StrictMode>
            <Router>
            <RotationProvider>
                <Menubar />
                <Toolbox addNode={addNode} />
                <Routes>
                <Route path="/" element={ 
                    <Canvas nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} />
                }/> {/* This does not re-render canvas */}
                </Routes>
            </RotationProvider>
            </Router>
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals();