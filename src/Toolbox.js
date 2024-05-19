import React from 'react';
import './Toolbox.css';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate } from './Gates.js';


export default function Toolbox() {
    return (
      <div className='toolbox_container'>
        <h1>Hello?</h1>
        {/* <svg className='svg_container'>
            <AndGate key="and1" x={50} y={50} text="AND" />
        </svg> */}

        {/* Make this stick to the right side of the screen and style it and research dragging and dropping it */}
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
  }
  
  