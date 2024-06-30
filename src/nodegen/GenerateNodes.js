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

const GenerateInputNodes = ({ addNode }) => {
    const [inputCount, setInputCount] = useState(0);

    const addInputNode = () => {
        const newNode = {
            id: `input-${inputCount + 1}`,
            data: { label: `Input ${inputCount + 1}` },
            position: { x: 0, y: 0 },
            type: 'input',
        };
        addNode(newNode);
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

export { InputNode, OutputNode, GenerateInputNodes, GenerateOutputNodes };