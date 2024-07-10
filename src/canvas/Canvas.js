import './Canvas.css';
import React, { useCallback } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
} from 'reactflow';

import 'reactflow/dist/style.css';
import { ANDGateNode, ORGateNode, XORGateNode, NORGateNode, NANDGateNode, NOTGateNode, XNORGateNode, JunctionGateNode } from './GateNode';
import CircuitEdge from './CircuitEdge';
import { RotationProvider } from './RotationContext';


const rfStyle = {
    backgroundColor: '#00b5e25e',
};

const nodeTypes = {
    ANDGateNode,
    ORGateNode,
    XORGateNode,
    NORGateNode,
    NANDGateNode,
    NOTGateNode,
    XNORGateNode,
    // InputNode,
    // OutputNode,
    JunctionGateNode
}


const edgeTypes = { CircuitEdge: CircuitEdge };

function Canvas({ nodes, edges, setNodes, setEdges }) {
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge({ ...connection, type: 'CircuitEdge' }, eds)),
        [setEdges]
    );

    return (
        <RotationProvider>
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
        </RotationProvider>

    );
}

export default Canvas;