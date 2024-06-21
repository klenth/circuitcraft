import './Canvas.css';
import React, { useCallback, useState } from 'react';
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
//import GridSmartEdge from './GridSmartEdge';
import CircuitEdge from './CircuitEdge';

const rfStyle = {
    backgroundColor: '#00b5e25e',
};

const initialNodes = [
    { id: 'node-1', type: 'ANDGateNode', position: { x: 0, y: -40 } },
    { id: 'node-2', type: 'ORGateNode', position: { x: -50, y: 100 } },
    { id: 'node-3', type: 'XORGateNode', position: { x: 100, y: 100 } },
    { id: 'node-4', type: 'NORGateNode', position: { x: -200, y: 100 } },
    { id: 'node-5', type: 'NANDGateNode', position: { x: -150, y: -40 } },
    { id: 'node-6', type: 'NOTGateNode', position: { x: 150, y: -40 } },
    { id: 'node-7', type: 'XNORGateNode', position: { x: 250, y: 100 } },
];

const initialEdges = [
    { id: 'e1-2', source: 'node-1', target: 'node-2', type: 'KathyEdge', style: { stroke: 'red'}, data: { nodes: initialNodes } },
    { id: 'e3-6', source: 'node-3', target: 'node-6', type: 'KathyEdge', style: { stroke: 'green'}, data: { nodes: initialNodes } },
    { id: 'e4-5', source: 'node-4', target: 'node-5', type: 'KathyEdge', style: { stroke: 'blue'}, data: { nodes: initialNodes } }
];

const nodeTypes = {
    ANDGateNode,
    ORGateNode,
    XORGateNode,
    NORGateNode,
    NANDGateNode,
    NOTGateNode,
    XNORGateNode,
};

const edgeTypes = { KathyEdge: CircuitEdge };

function Canvas() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge({ ...connection, type: 'GridSmartEdge', data: { nodes } }, eds)),
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