import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    useReactFlow
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ANDGateNode, ORGateNode, XORGateNode, NORGateNode, NANDGateNode, NOTGateNode, XNORGateNode, JunctionGateNode } from './GateNode';
import CircuitEdge from './CircuitEdge';
import CircuitConnectionLine from './CircuitConnectionLine';
import { RotationProvider } from './RotationContext';
import { LabelNode, InputNode, OutputNode } from '../nodegen/GenerateNodes';

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
    JunctionGateNode,
    label: LabelNode,
    input: InputNode,
    output: OutputNode,
};

const edgeTypes = { CircuitEdge: CircuitEdge };

function Canvas({ nodes, edges, setNodes, setEdges, handleLabelChange, setReactFlowInstance }) {
    const reactFlowInstance = useReactFlow();
    
    useEffect(() => {
        if (setReactFlowInstance) {
            setReactFlowInstance(reactFlowInstance);
        }
    }, [setReactFlowInstance, reactFlowInstance]);

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
            <div style={{ width: '85vw', height: '90vh', borderRadius: '3px' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    connectionLineComponent={CircuitConnectionLine}
                    connectionMode={'loose'}
                    isValidConnection={c => c.source !== c.target}
                    fitView
                    style={rfStyle}
                    onLabelChange={handleLabelChange} //this gives error unknown event handler property
                >
                </ReactFlow>
            </div>
        </RotationProvider>
    );
}

export default Canvas;