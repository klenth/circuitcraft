/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

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
  Position, 
  getSmoothStepPath
} from 'reactflow';
 
import 'reactflow/dist/style.css';
import { ANDGateNode, ORGateNode, XORGateNode, NORGateNode, NANDGateNode, NOTGateNode, XNORGateNode } from './GateNode';
import CustomStepEdge from './CustomEdge';
import { SmartStepEdge } from '@tisoap/react-flow-smart-edge'

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
    { id: 'e1-2', source: 'node-1', target: 'node-2', type: 'customStepEdge' }, // Set custom edge type
  ];

//defining customized node types
const nodeTypes = { ANDGateNode: ANDGateNode, 
                    ORGateNode: ORGateNode,
                    XORGateNode: XORGateNode,
                    NORGateNode: NORGateNode,
                    NANDGateNode: NANDGateNode,
                    NOTGateNode: NOTGateNode,
                    XNORGateNode: XNORGateNode, };

const source = { x: 0, y: 20 };
const target = { x: 150, y: 100 };

// Custom Edge Component
const edgeTypes = { customStepEdge: CustomStepEdge, smartStep : SmartStepEdge }; //Register the custom edge



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
    (connection) => setEdges((eds) => addEdge({ ...connection, type: 'customStepEdge' }, eds)),
    [setEdges]
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
        {/* <Background
          id="1"
          gap={30}
          color="#f1f1f1"
          variant={BackgroundVariant.Lines}
        /> */}
      </ReactFlow>
    </div>
  );
}


export default Canvas;