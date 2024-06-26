import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const InputNode = ({ data }) => (
    <div>
        {data.label}
        <Handle type="source" position={Position.Right} />
    </div>
);

const OutputNode = ({ data }) => (
    <div>
        {data.label}
        <Handle type="target" position={Position.Left} />
    </div>
);

const GenerateInputNodes = ({ setInputNodes }) => {
    const [number, setNumber] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setNumber(value);

        if (!isNaN(value) && value !== '') {
            const nodeCount = parseInt(value, 10);
            const newNodes = Array.from({ length: nodeCount }, (_, i) => ({
                id: `input-${i + 1}`,
                data: { label: `Input ${i + 1}` },
                position: { x: (i * 50), y: (i * 50) },
                type: 'input',
            }));
            setInputNodes(newNodes);
        } else {
            setInputNodes([]);
        }
    };

    return (
        <div>
            <label>
                How many inputs?
                <input
                    type="text"
                    value={number}
                    onChange={handleInputChange}
                    style={{ textDecoration: 'underline', width: '40px', margin: '0 10px' }}
                />
            </label>
        </div>
    );
};

const GenerateOutputNodes = ({ setOutputNodes }) => {
    const [number, setNumber] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setNumber(value);

        if (!isNaN(value) && value !== '') {
            const nodeCount = parseInt(value, 10);
            const newNodes = Array.from({ length: nodeCount }, (_, i) => ({
                id: `output-${i + 1}`,
                data: { label: `Output ${i + 1}` },
                position: { x: (i * 50) + 25, y: (i * 50) + 25 },
                type: 'output',
            }));
            setOutputNodes(newNodes);
        } else {
            setOutputNodes([]);
        }
    };

    return (
        <div>
            <label>
                How many outputs?
                <input
                    type="text"
                    value={number}
                    onChange={handleInputChange}
                    style={{ textDecoration: 'underline', width: '40px', margin: '0 10px' }}
                />
            </label>
        </div>
    );
};

export { InputNode, OutputNode, GenerateInputNodes, GenerateOutputNodes };