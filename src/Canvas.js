import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate } from './Gates.js';
import { TwoOne, ThreeOne } from './GateNodes.js';
import 'reactflow/dist/style.css';
import './Canvas.css';
import './Gate.css';
import './GateNodes.css'

const initialNodes = [
    { id: '1', position: { x: 200, y: 200 }, data: { label: <svg width="100" height="100"><AndGate text="AND" /></svg> }, type: 'TwoOne' },
    { id: '2', position: { x: 200, y: 400 }, data: { label: <svg width="100" height="100"><OrGate text="OR" /></svg> }, type: 'TwoOne' },
    { id: '3', position: { x: 200, y: 600 }, data: { label: <svg width="100" height="100"><XorGate text="XOR" /></svg> }, type: 'ThreeOne' },
    { id: '4', position: { x: 200, y: 800 }, data: { label: <svg width="100" height="100"><NandGate text="NAND" /></svg> }, type: 'TwoOne' },
    { id: '5', position: { x: 600, y: 200 }, data: { label: <svg width="100" height="100"><NorGate text="NOR" /></svg> }, type: 'TwoOne' },
    { id: '6', position: { x: 600, y: 400 }, data: { label: <svg width="100" height="100"><XnorGate text="XNOR" /></svg> }, type: 'ThreeOne' },
    { id: '7', position: { x: 600, y: 600 }, data: { label: <svg width="100" height="100"><NotGate text="NOT" /></svg> }, type: 'TwoOne' },
];

const initialEdges = [];

const edgeOptions = {
    style: {
        strokeWidth: 4,
        stroke: 'black',
    },
};

const nodeTypes = { TwoOne, ThreeOne };

const Canvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div className="Canvas">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeOptions={edgeOptions}
            />
        </div>
    );
};

export default Canvas;


/*{ id: '1', position: { x: 200, y: 200 }, data: { label: <svg width="100%" height="100%"><AndGate text="AND" /></svg> }, type: 'TwoOne' },
{ id: '2', position: { x: 200, y: 400 }, data: { label: <svg width="100%" height="100%"><OrGate text="OR" /></svg> }, type: 'TwoOne' },
{ id: '3', position: { x: 200, y: 600 }, data: { label: <svg width="100%" height="100%"><XorGate text="XOR" /></svg> }, type: 'ThreeOne' },
{ id: '4', position: { x: 200, y: 800 }, data: { label: <svg width="100%" height="100%"><NandGate text="NAND" /></svg> }, type: 'TwoOne' },
{ id: '5', position: { x: 600, y: 200 }, data: { label: <svg width="100%" height="100%"><NorGate text="NOR" /></svg> }, type: 'TwoOne' },
{ id: '6', position: { x: 600, y: 400 }, data: { label: <svg width="100%" height="100%"><XnorGate text="XNOR" /></svg> }, type: 'ThreeOne' },
{ id: '7', position: { x: 600, y: 600 }, data: { label: <svg width="100%" height="100%"><NotGate text="NOT" /></svg> }, type: 'TwoOne' },*/