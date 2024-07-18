import React, { useState } from 'react';
import './Toolbox.css';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate, Junction } from '../gates/Gates.js';
import { GenerateInputNodes, GenerateOutputNodes, GenerateLabelNodes } from '../nodegen/GenerateNodes';

export default function Toolbox({ addNode, handleLabelChange }) {
    const [hovered_gate, set_hovered_gate] = useState(null);

    function handle_gate_click(gate_type) {
        const newNode = {
            id: `${gate_type}-${Date.now()}`, //timestamp only here for unique id
            type: `${gate_type}GateNode`,
            position: { x: 0, y: 0 },
            data: { label: "" },
        };
        addNode(newNode);
    }

    function handle_mouse_hover(gate_type) {
        set_hovered_gate(gate_type);
    }

    function handle_mouse_leave() {
        set_hovered_gate(null);
    }
    

    return (
        <div className='toolbox_container'>
            <div className='svg_container'>
                <svg
                    onClick={() => handle_gate_click('AND')}
                    onMouseEnter={() => handle_mouse_hover('AND')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="-55 -50 100 100">
                    <AndGate
                        key="and"
                        border={hovered_gate === 'AND' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('OR')}
                    onMouseEnter={() => handle_mouse_hover('OR')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="-12 -10 100 100">
                    <OrGate
                        key="or"
                        border={hovered_gate === 'OR' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('NOT')}
                    onMouseEnter={() => handle_mouse_hover('NOT')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="-13 -10 100 100">
                    <NotGate
                        key="not"
                        border={hovered_gate === 'NOT' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('XOR')}
                    onMouseEnter={() => handle_mouse_hover('XOR')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="-13 -10 100 100">
                    <XorGate
                        key="xor"
                        border={hovered_gate === 'XOR' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('NAND')}
                    onMouseEnter={() => handle_mouse_hover('NAND')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="-7 -10 100 100">
                    <NandGate
                        key="nand"
                        border={hovered_gate === 'NAND' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('NOR')}
                    onMouseEnter={() => handle_mouse_hover('NOR')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="-8 -10 100 100">
                    <NorGate
                        key="nor"
                        border={hovered_gate === 'NOR' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('XNOR')}
                    onMouseEnter={() => handle_mouse_hover('XNOR')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="-12 -10 100 100">
                    <XnorGate
                        key="xnor"
                        border={hovered_gate === 'XNOR' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('Junction')}
                    onMouseEnter={() => handle_mouse_hover('Junction')}
                    onMouseLeave={handle_mouse_leave}
                    width="40" height="10"
                    viewBox="19 30 60 40">
                    <Junction
                        key="junction"
                        fill={hovered_gate === 'Junction' ? '#595959' : 'black'}
                    />
                </svg>
                <div className="input">
                    <GenerateInputNodes addNode={addNode} handleLabelChange={handleLabelChange}/>
                </div>
                <div className="input">
                    <GenerateOutputNodes addNode={addNode} handleLabelChange={handleLabelChange}/>
                </div>
                <div className="input">
                    <GenerateLabelNodes addNode={addNode} handleLabelChange={handleLabelChange}/>
                </div>
            </div>
        </div>
    );
}