import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Toolbox from './toolbox/Toolbox';
import Menubar from './menubar/Menubar';
import Canvas from './canvas/Canvas';
import reportWebVitals from './reportWebVitals';
import { RotationProvider } from './canvas/RotationContext';


const initialNodes = [];
const initialEdges = [];

const Root = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

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
        setNodes((prevNodes) =>
            prevNodes.map((node) => {
                if (node.id === id) {
                    return { ...node, data: { ...node.data, label: newLabel } };
                }
                return node;
            })
        );
    };

    return (
        <React.StrictMode>
            <RotationProvider>
                <Menubar
                    onSave={() => handleSave()}
                    onOpen={() => handleOpen()}
                />
                <Toolbox addNode={addNode} handleLabelChange={handleLabelChange} />
                <Canvas nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} handleLabelChange={handleLabelChange} />
            </RotationProvider>
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

reportWebVitals();