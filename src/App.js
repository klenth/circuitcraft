import logo from './logo.svg';
import './App.css';

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

const rfStyle = {
  backgroundColor: '#B8CEFF',
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
  { id: 'e1-2', source: 'node-1', target: 'node-2', type: 'customEdge' }
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
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [path, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
    sourceX: source.x,
    sourceY: source.y,
    sourcePosition: Position.Right,
    targetX: target.x,
    targetY: target.y,
    targetPosition: Position.Left,
  });

  return (
    <>
      <path id={id} d={path} />
    </>
  );
};

const edgeTypes = { customEdge: CustomEdge }; // Register the custom edge



function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: 'custom-edge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
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
        <Background
          id="1"
          gap={10}
          color="#f1f1f1"
          variant={BackgroundVariant.Lines}
        />
      </ReactFlow>
    </div>
  );
}



export default App;