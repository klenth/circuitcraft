import React, { useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Toolbox from './toolbox/Toolbox';
import Menubar from './menubar/Menubar';
import Canvas from './canvas/Canvas';
import reportWebVitals from './reportWebVitals';
import { RotationProvider } from './canvas/RotationContext';
import { ReactFlowProvider, useReactFlow, getNodesBounds, getViewportForBounds } from 'reactflow';
import { toPng, toSvg } from 'html-to-image';

const initialNodes = [];
const initialEdges = [];

const Root = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const reactFlowInstanceRef = useRef(null);

    const addNode = useCallback((newNode) => {
        setNodes((prevNodes) => [...prevNodes, newNode]);
    }, []);

    const handleSave = () => {
        // all the state to be saved
        // (N.B. that this saves *all* state on nodes/edges, including which ones are selected, dragging status, etc.
        // Probably best to limit this down, but maybe that can wait until we're sure the node/edge states are settled.)
        const saveData = {
            format: 'circuitcraft-save-json',
            version: 0.1,   // update this whenever format of saved data changes
            nodes: nodes,
            edges: edges,
        };

        const data = new Blob([JSON.stringify(saveData)], { type: 'application/json' });
        const a = document.createElement('a');
        const url = URL.createObjectURL(data);
        a.href = url;
        a.download = 'circuit.json'; // TODO: better way to name the downloaded file?
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    };

    const handleOpen = () => {
        const fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.addEventListener('change', async event => {
            const file = fileInput.files[0];
            const text = await file.text();
            // document.body.removeChild(fileInput);
            const data = JSON.parse(text);
            if (data.format === 'circuitcraft-save-json' && data.version === 0.1) {
                setNodes(data.nodes);
                setEdges(data.edges);
            } else {
                console.warn('Not a compatible CircuitCraft save file!');
                if (data.format !== 'circuitcraft-save-json')
                    console.warn('(Missing format: "circuitcraft-save-json")');
                if (data.version === undefined)
                    console.warn('(Missing version number)');
                else if (data.version !== 0.1)
                    console.warn(`(Wrong version number: ${data.version}; expected 0.1)`);
            }
        });

        // Actually adding fileInput to the body messes with the layout, but maybe some browsers won't let us open
        // a file with a file input that isn't in the DOM? Probably best to find a place to put it.
        // document.body.appendChild(fileInput);
        fileInput.click();
    };
    
    const handleLabelChange = (id, newLabel) => {
        console.log("the handle label change is being called in index");
        setNodes((prevNodes) =>
            prevNodes.map((node) => {
                if (node.id === id) {
                    return { ...node, data: { ...node.data, label: newLabel } };
                }
                return node;
            })
        );
    };

    
    const exportPng = (reactFlowInstance) => {
        if (!reactFlowInstanceRef.current) return;
        const { getNodes } = reactFlowInstanceRef.current;
        const nodesBounds = getNodesBounds(getNodes());
        const viewport = getViewportForBounds (
            nodesBounds,
            1024,
            768,
            0.5,
            2,
        );
        const element = document.querySelector('.react-flow__viewport');
        
        if (element) {
            toPng(element, {
                backgroundColor: '#B6E4F5',
                width: 1024,
                height: 768,
                style: {
                    width: 1024,
                    height: 768,
                    transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
                },
            }).then((dataUrl) => {
                const a = document.createElement('a');
                a.setAttribute('download', 'reactflow.png');
                a.setAttribute('href', dataUrl);
                a.click();
            }).catch((error) => {
                console.error('Error exporting PNG:', error);
            });
        } else {
            console.error('Element not found: .react-flow__viewport');
        }
    };

    return (
        <React.StrictMode>
            <RotationProvider>
                <Menubar
                    onSave={() => handleSave()}
                    onOpen={() => handleOpen()}
                    exportPng={() => exportPng()}
                />
                <Toolbox addNode={addNode} handleLabelChange={handleLabelChange} />
                <ReactFlowProvider>
                    <Canvas 
                        nodes={nodes} 
                        edges={edges} 
                        setNodes={setNodes} 
                        setEdges={setEdges} 
                        handleLabelChange={handleLabelChange}
                        setReactFlowInstance={(instance) => reactFlowInstanceRef.current = instance}
                    />
                </ReactFlowProvider>
            </RotationProvider>
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals();