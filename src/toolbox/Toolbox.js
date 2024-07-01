import React, { useState } from 'react';
import './Toolbox.css';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate, Junction } from '../gates/Gates.js';
import { GenerateInputNodes, GenerateOutputNodes } from '../nodegen/GenerateNodes';

export default function Toolbox({ addNode }) {
    const [hovered_gate, set_hovered_gate] = useState(null);

    function handle_gate_click(gate_type) {
        //alert(`Clicked on ${gate_type} gate`);
        const newNode = {
            id: `${gate_type}-${Date.now()}`, //timestamp only here for unique id
            type: `${gate_type}GateNode`,
            position: { x: 0, y: 0 },
            data: { label: gate_type },
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
                    viewBox="-45 -50 100 100">
                    <AndGate
                        key="and"
                        text="AND"
                        scale={hovered_gate === 'AND' ? 1.15 : 1}
                        border={hovered_gate === 'AND' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('OR')}
                    onMouseEnter={() => handle_mouse_hover('OR')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="0 -10 100 100">
                    <OrGate
                        key="or"
                        text="OR"
                        scale={hovered_gate === 'OR' ? 1.15 : 1}
                        border={hovered_gate === 'OR' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('NOT')}
                    onMouseEnter={() => handle_mouse_hover('NOT')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="0 -10 100 100">
                    <NotGate
                        key="not"
                        text="NOT"
                        scale={hovered_gate === 'NOT' ? 1.15 : 1}
                        border={hovered_gate === 'NOT' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('XOR')}
                    onMouseEnter={() => handle_mouse_hover('XOR')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="0 -10 100 100">
                    <XorGate
                        key="xor"
                        text="XOR"
                        scale={hovered_gate === 'XOR' ? 1.15 : 1}
                        border={hovered_gate === 'XOR' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('NAND')}
                    onMouseEnter={() => handle_mouse_hover('NAND')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="10 -10 100 100">
                    <NandGate
                        key="nand"
                        text="NAND"
                        scale={hovered_gate === 'NAND' ? 1.15 : 1}
                        border={hovered_gate === 'NAND' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('NOR')}
                    onMouseEnter={() => handle_mouse_hover('NOR')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="15 -10 100 100">
                    <NorGate
                        key="nor"
                        text="NOR"
                        scale={hovered_gate === 'NOR' ? 1.15 : 1}
                        border={hovered_gate === 'NOR' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('XNOR')}
                    onMouseEnter={() => handle_mouse_hover('XNOR')}
                    onMouseLeave={handle_mouse_leave}
                    width="50" height="25"
                    viewBox="1 -10 100 100">
                    <XnorGate
                        key="xnor"
                        text="XNOR"
                        scale={hovered_gate === 'XNOR' ? 1.15 : 1}
                        border={hovered_gate === 'XNOR' ? '#595959' : 'black'}
                    />
                </svg>
                <svg
                    onClick={() => handle_gate_click('Junction')}
                    onMouseEnter={() => handle_mouse_hover('Junction')}
                    onMouseLeave={handle_mouse_leave}
                    width="40" height="10"
                    viewBox="30 30 60 40">
                    <Junction
                        key="junction"
                        scale={hovered_gate === 'Junction' ? 1.1 : 1}
                        fill={hovered_gate === 'Junction' ? '#595959' : 'black'}
                    />
                </svg>
                <div className="input">
                    <GenerateInputNodes addNode={addNode} />
                </div>
                <div className="input">
                    <GenerateOutputNodes addNode={addNode} />
                </div>
            </div>
        </div>
    );
}