import React, { useState } from 'react';
import './Toolbox.css';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate } from '../gates/Gates.js';


export default function Toolbox() {

  const [hovered_gate, set_hovered_gate] = useState("null"); //creating state to manage hover status of gates

  function handle_gate_click(gate_type) {
    console.log(`Clicked on ${gate_type} gate`);
  }

  function handle_mouse_hover(gate_type) {
    set_hovered_gate(gate_type);
  }

  function handle_mouse_leave() {
    set_hovered_gate(null);
  }
    return (
      <div className='toolbox_container'>
        <h1 className='toolbox'>TOOLBOX</h1>
        <svg className='svg_container'>
          {/* Keeping the exported gates in individual svgs is the only way I could figure out
              for the onClick property to work as needed */}
          <svg onClick={() => handle_gate_click('AND')} 
            onMouseEnter={() => handle_mouse_hover('AND')} 
            onMouseLeave={ handle_mouse_leave}>
            <AndGate key="and" 
                x={hovered_gate === 'AND' ? 120 : 90}
                y={hovered_gate === 'AND' ? 151 : 100}
                text="AND"
                scale={hovered_gate === 'AND' ? 1.15 : 1} 
                border={hovered_gate === 'AND' ? '#595959' : 'black'}
              />
            {/* perhaps use state to see if its being hovered over -
                if it is, then add the scale props and do sthn like x=x-20 y=y-30 so the gate svg stays in the same place*/}
          </svg>
          <svg onClick={() => handle_gate_click('OR')}
            onMouseEnter={() => handle_mouse_hover('OR')} 
            onMouseLeave={ handle_mouse_leave}>
            <OrGate key="or" 
                x={hovered_gate === 'OR' ? 215 : 195} 
                y={hovered_gate === 'OR' ? 115 :70} 
                text="OR"
                scale={hovered_gate === 'OR' ? 1.15 : 1}
                border={hovered_gate === 'OR' ? '#595959' : 'black'}
              />
          </svg>
          <svg onClick={() => handle_gate_click('NOT')}
            onMouseEnter={() => handle_mouse_hover('NOT')} 
            onMouseLeave={ handle_mouse_leave}>
            <NotGate key="not1" 
                x={hovered_gate === 'NOT' ? 80: 55} 
                y={hovered_gate === 'NOT' ? 250: 210} 
                text="NOT"
                scale={hovered_gate === 'NOT' ? 1.15 : 1} 
                border={hovered_gate === 'NOT' ? '#595959' : 'black'} />
          </svg>
          <svg onClick={() => handle_gate_click('XOR')}
            onMouseEnter={() => handle_mouse_hover('XOR')} 
            onMouseLeave={ handle_mouse_leave}>
            <XorGate key="xor1" 
                x={hovered_gate === 'XOR' ? 215 : 195}               
                y={hovered_gate === 'XOR' ? 255: 210} 
                text="XOR"
                scale={hovered_gate === 'XOR' ? 1.15 : 1} 
                border={hovered_gate === 'XOR' ? '#595959' : 'black'} />
          </svg>
          <svg onClick={() => handle_gate_click('NAND')}
            onMouseEnter={() => handle_mouse_hover('NAND')} 
            onMouseLeave={ handle_mouse_leave}>
            <NandGate key="nand1" 
                x={hovered_gate === 'NAND' ? 80 : 55} 
                y={hovered_gate === 'NAND' ? 395 : 355} 
                text="NAND" 
                scale={hovered_gate === 'NAND' ? 1.15 : 1} 
                border={hovered_gate === 'NAND' ? '#595959' : 'black'} />
          </svg>
          <svg onClick={() => handle_gate_click('NOR')}
            onMouseEnter={() => handle_mouse_hover('NOR')} 
            onMouseLeave={ handle_mouse_leave}>
            <NorGate key="nor1" 
                x={hovered_gate === 'NOR' ? 215 : 195} 
                y={hovered_gate === 'NOR' ? 400 : 355} 
                text="NOR"
                scale={hovered_gate === 'NOR' ? 1.15 : 1} 
                border={hovered_gate === 'NOR' ? '#595959' : 'black'} />
          </svg>
          <svg onClick={() => handle_gate_click('XNOR')}
            onMouseEnter={() => handle_mouse_hover('XNOR')} 
            onMouseLeave={ handle_mouse_leave}>
            <XnorGate key="xnor1" 
                x={hovered_gate === 'XNOR' ? 150 : 130} 
                y={hovered_gate === 'XNOR' ? 545 : 500} 
                text="XNOR"
                scale={hovered_gate === 'XNOR' ? 1.15 : 1} 
                border={hovered_gate === 'XNOR' ? '#595959' : 'black'} />
          </svg> 
        </svg>
      
      </div>
    );
  }
  
  