import React, { useState, useEffect } from 'react';
import { Handle } from 'reactflow';
import './GenerateNodes.css';

// Function to generate a new node
const generateNode = (type, count, handleLabelChange, addNode, position) => {
    const newNode = {
        id: `${type}-${count + 1}`,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${count + 1}`, onLabelChange: handleLabelChange },
        position: position || { x: 0, y: 0 },
        type: type,
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
            zIndex : '100',
        },
        className: `${type}_node`,
    };
    addNode(newNode);
};

// Component to generate new nodes
const GenerateNodes = ({ type, addNode, handleLabelChange, position }) => {
    const [count, setCount] = useState(0);

    const addNewNode = () => {
        generateNode(type, count, handleLabelChange, addNode, position);
        setCount(count + 1);
    };

    return (
        <div>
            <button onClick={addNewNode}>Add {type.charAt(0).toUpperCase() + type.slice(1)}</button>
        </div>
    );
};

export const GenerateInputNodes = (props) => <GenerateNodes {...props} type="input" position={{ x: 0, y: 0 }} />;
export const GenerateOutputNodes = (props) => <GenerateNodes {...props} type="output" position={{ x: 25, y: 25 }}/>;
export const GenerateLabelNodes = (props) => <GenerateNodes {...props} type="label" position={{ x: 0, y: 15 }}/>;

// Node component to render nodes
const NodeComponent = ({ id, data, type }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [labelText, setLabelText] = useState(data.label);

    useEffect(() => {
        setLabelText(data.label);
    }, [data.label]);

    const handleBlur = () => {
        setIsEditing(false);
        const trimmedText = labelText.trim();
        const newText = trimmedText === "" ? type.charAt(0).toUpperCase() + type.slice(1) : trimmedText;
        setLabelText(newText);
        data.onLabelChange(id, newText);
    };

    const handleChange = (e) => {
        setLabelText(e.target.value);
    };

    return (
        <div onDoubleClick={() => setIsEditing(true)} className = 'node_style'>
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
            {type === 'input' && <Handle type="source" id="a" />}
            {type === 'output' && <Handle type="target" id="z" />}
        </div>
    );
};

export const InputNode = (props) => <NodeComponent {...props} type="input" />;
export const OutputNode = (props) => <NodeComponent {...props} type="output" />;
export const LabelNode = (props) => <NodeComponent {...props} type="label" />;