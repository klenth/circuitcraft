import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './GenerateNodes.css';


const GenerateInputNodes = ({ addNode }) => {
    const [inputCount, setInputCount] = useState(0);

    const addInputNode = () => {
        const newNode = {
            id: `input-${inputCount + 1}`,
            data: { label: `Input ${inputCount + 1}` },
            position: { x: 0, y: 0 },
            type: 'input',
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'none',
                backgroundColor: 'transparent',
                width: '70px',
                height: '25px',
                borderRadius: '0',
            },
            className: 'input_node'
        };
        addNode(newNode);
        console.log("Gate type: " + newNode.type);
        setInputCount(inputCount + 1);
    };

    return (
        <div>
            <button onClick={addInputNode}>Add Input</button>
        </div>
    );
};

const GenerateOutputNodes = ({ addNode }) => {
    const [outputCount, setOutputCount] = useState(0);

    const addOutputNode = () => {
        const newNode = {
            id: `output-${outputCount + 1}`,
            data: { label: `Output ${outputCount + 1}` },
            position: { x: 25, y: 25 },
            type: 'output',
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'none',
                backgroundColor: 'transparent',
                width: '70px',
                height: '25px',
                borderRadius: '0',
            },
            className: 'output_node'
        };
        addNode(newNode);
        setOutputCount(outputCount + 1);
    };

    return (
        <div>
            <button onClick={addOutputNode}>Add Output</button>
        </div>
    );
};

export { GenerateInputNodes, GenerateOutputNodes };