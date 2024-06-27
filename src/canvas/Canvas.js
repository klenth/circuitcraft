import './Canvas.css';
import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
    Background,
    BackgroundVariant,
    useNodesState,
    useEdgesState,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Position
} from 'reactflow';

import 'reactflow/dist/style.css';
import { ANDGateNode, ORGateNode, XORGateNode, NORGateNode, NANDGateNode, NOTGateNode, XNORGateNode } from './GateNode';
import { InputNode, OutputNode } from '../nodegen/GenerateNodes';
import CircuitEdge from './CircuitEdge';

const rfStyle = {
    backgroundColor: '#00b5e25e',
};

const initialNodes = [
    { id: 'AND-1', type: 'ANDGateNode', position: { x: 0, y: -40 } },
    { id: 'OR-1', type: 'ORGateNode', position: { x: -50, y: 100 } },
    { id: 'XOR-1', type: 'XORGateNode', position: { x: 100, y: 100 } },
    { id: 'NOR-1', type: 'NORGateNode', position: { x: -200, y: 100 } },
    { id: 'NAND-1', type: 'NANDGateNode', position: { x: -150, y: -40 } },
    { id: 'NOT-1', type: 'NOTGateNode', position: { x: 150, y: -40 } },
    { id: 'XNOR-1', type: 'XNORGateNode', position: { x: 250, y: 100 } },
];

const initialEdges = [
    { id: 'e1-2', source: 'AND-1', target: 'OR-1', type: 'CircuitEdge', style: { stroke: 'red'}, data: { nodes: initialNodes } },
    { id: 'e3-6', source: 'XOR-1', target: 'NOT-1', type: 'CircuitEdge', style: { stroke: 'green'}, data: { nodes: initialNodes } },
    { id: 'e4-5', source: 'NAND-1', target: 'NOR-1', type: 'CircuitEdge', style: { stroke: 'blue'}, data: { nodes: initialNodes } }
];

const nodeTypes = {
    ANDGateNode,
    ORGateNode,
    XORGateNode,
    NORGateNode,
    NANDGateNode,
    NOTGateNode,
    XNORGateNode,
    InputNode,
    OutputNode,
};

const edgeTypes = { CircuitEdge: CircuitEdge  };

function Canvas({ inputNodes, outputNodes }) {
    const [nodes, setNodes] = useState([...initialNodes, ...inputNodes, ...outputNodes]);
    const [edges, setEdges] = useState(initialEdges);

    useEffect(() => {
        setNodes([...initialNodes, ...inputNodes, ...outputNodes]);
    }, [inputNodes, outputNodes]);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge({ ...connection, type: 'CircuitEdge', data: { nodes } }, eds)),
        [setEdges, nodes]
    );

    return (
        <div style={{ width: '75vw', height: '90vh', borderRadius: '3px' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                style={rfStyle}
            >
            </ReactFlow>
        </div>
    );
}

export default Canvas;