import React from 'react';
import { Handle } from 'reactflow';

const TwoOne = ({ data }) => {
    return (
        <div className="Gate-node">
            <Handle type="target" position="left" id="a" style={{ top: '30%' }} />
            <Handle type="target" position="left" id="b" style={{ top: '70%' }} />
            <div className="Gate-image-node">
                {data.label}
            </div>
            <Handle type="source" position="right" id="c" />
        </div>
    );
};

const ThreeOne = ({ data }) => {
    return (
        <div className="Gate-node">
            <Handle type="target" position="left" id="a" style={{ top: '20%' }} />
            <Handle type="target" position="left" id="b" style={{ top: '50%' }} />
            <Handle type="target" position="left" id="c" style={{ top: '80%' }} />
            <div className="Gate-image-node">
                {data.label}
            </div>
            <Handle type="source" position="right" id="d" />
        </div>
    );
};

export {TwoOne, ThreeOne};
