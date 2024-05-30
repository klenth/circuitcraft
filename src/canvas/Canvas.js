import './Canvas.css';
import '../gates/Gate.css';
import './GateNodes.css'

import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
 
import 'reactflow/dist/style.css';
import { ANDGateNode, ORGateNode, XORGateNode, NORGateNode, NANDGateNode, NOTGateNode, XNORGateNode } from './GateNode';
import { NotGateNode, TwoOne, ThreeOne } from './GateNodes.js';

const nodeTypes = { NotGateNode, TwoOne, ThreeOne };

const initialNodes = [
  { id: '1', position: { x: 200, y: 200 }, data: { label: <svg width="100" height="100"><ANDGateNode x={42} y={53} text="AND" /></svg> }, type: 'TwoOne' },
  { id: '2', position: { x: 200, y: 400 }, data: { label: <svg width="100" height="100"><ORGateNode x={18} y={8} text="OR" /></svg> }, type: 'TwoOne' },
  { id: '3', position: { x: 200, y: 600 }, data: { label: <svg width="100" height="100"><XORGateNode x={20} y={8} text="XOR" /></svg> }, type: 'ThreeOne' },
  { id: '4', position: { x: 200, y: 800 }, data: { label: <svg width="100" height="100"><NORGateNode x={8} y={8} text="NAND" /></svg> }, type: 'TwoOne' },
  { id: '5', position: { x: 600, y: 200 }, data: { label: <svg width="100" height="100"><NANDGateNode x={10} y={8} text="NOR" /></svg> }, type: 'TwoOne' },
  { id: '6', position: { x: 600, y: 400 }, data: { label: <svg width="100" height="100"><NOTGateNode x={18} y={8} text="XNOR" /></svg> }, type: 'ThreeOne' },
  { id: '7', position: { x: 600, y: 600 }, data: { label: <svg width="100" height="100"><XNORGateNode x={12} y={8} text="NOT" /></svg> }, type: 'NotGateNode' },
];

const initialEdges = [];

const edgeOptions = {
  style: {
    strokeWidth: 4,
    stroke: 'black',
  },
};

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [setEdges],
  );

  return (
      <div className="Canvas-Container" style={{ width: '75vw', height: '100vh' }} >
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