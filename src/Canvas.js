import './Canvas.css';
import React from 'react';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate } from './Gates.js';

const Canvas = () => {
    return (
        <div class="Canvas">
            <svg width="100%" height="100%">
                <AndGate key="and1" x={50} y={50} text="AND" />
                <OrGate key="or1" x={200} y={50} text="OR" />
                <XorGate key="xor1" x={350} y={50} text="XOR" />
                <NandGate key="nand1" x={500} y={50} text="NAND" />
                <NorGate key="nor1" x={650} y={50} text="NOR" />
                <XnorGate key="xnor1" x={800} y={50} text="XNOR" />
                <NotGate key="not1" x={950} y={50} text="NOT" />
            </svg>
        </div>
    );
};

export default Canvas;
