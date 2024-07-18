import React, { useState, useEffect } from 'react';
import { Handle } from 'reactflow';
import './GenerateNodes.css';

const GenerateInputNodes = ({ addNode, handleLabelChange }) => {
    const [inputCount, setInputCount] = useState(0);

    const addInputNode = () => {
        const newNode = {
            id: `input-${inputCount + 1}`,
            data: { label: `Input ${inputCount + 1}`, onLabelChange: handleLabelChange },
            position: { x: 0, y: 0 },
            type: 'input',
            isEditable: true,
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
        setInputCount(inputCount + 1);
    };

    return (
        <div>
            <button onClick={addInputNode}>Add Input</button>
        </div>
    );
};

const GenerateOutputNodes = ({ addNode, handleLabelChange }) => {
    const [outputCount, setOutputCount] = useState(0);

    const addOutputNode = () => {
        const newNode = {
            id: `output-${outputCount + 1}`,
            data: { label: `Output ${outputCount + 1}`, onLabelChange: handleLabelChange },
            position: { x: 25, y: 25 },
            type: 'output',
            isEditable: true,
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

const GenerateLabelNodes = ({ addNode, handleLabelChange }) => {
    const [labelCount, setLabelCount] = useState(0);

    const addLabelNode = () => {
        const newNode = {
            id: `label-${labelCount + 1}`,
            data: { label: `Label ${labelCount + 1}`, onLabelChange: handleLabelChange },
            position: { x: 0, y: 12.5 },
            type: 'label',
            isEditable: true,
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
            className: 'label_node'
        };
        addNode(newNode);
        setLabelCount(labelCount + 1);
    };

    return (
        <div>
            <button onClick={addLabelNode}>Add Label</button>
        </div>
    );
};

const LabelNode = ({ id, data, isEditable }) => {
    const [isEditing, setIsEditing] = useState(true);
    const [labelText, setLabelText] = useState(data.label);

    useEffect(() => {
        setLabelText(data.label);
    }, [data.label]);

    const handleBlur = () => {
        setIsEditing(false);
        const trimmedText = labelText.trim();
        const newText = trimmedText === "" ? "Label" : trimmedText;
        setLabelText(newText);
        data.onLabelChange(id, newText);
    };

    const handleChange = (e) => {
        setLabelText(e.target.value);
    };

    return (
        <div onDoubleClick={() => setIsEditing(true)} style={{ position: 'relative', width: '100%', height: '100%' }}>
            {isEditing ? (
                <input
                    type="text"
                    value={labelText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    style={{ width: '100%', backgroundColor: 'transparent', border: 'none' }}
                />
            ) : (
                <span>{data.label}</span>
            )}
        </div>
    );
};

export { GenerateInputNodes, GenerateOutputNodes, GenerateLabelNodes, LabelNode };