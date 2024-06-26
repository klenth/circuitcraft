import React, { useState } from 'react';
import './Toolbox.css';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate } from '../gates/Gates.js';
import { GenerateInputNodes, GenerateOutputNodes } from '../nodegen/GenerateNodes';

export default function Toolbox({ setInputNodes, setOutputNodes }) {
    const [hovered_gate, set_hovered_gate] = useState(null);

    function handle_gate_click(gate_type) {
        alert(`Clicked on ${gate_type} gate`);
    }

    function handle_mouse_hover(gate_type) {
        set_hovered_gate(gate_type);
    }

    function handle_mouse_leave() {
        set_hovered_gate(null);
    }

    const positions = {
        'ANDGateNode': { x: 0, y: -40 },
        'ORGateNode': { x: -50, y: 100 },
        'XORGateNode': { x: 100, y: 100 },
        'NORGateNode': { x: -200, y: 100 },
        'NANDGateNode': { x: -150, y: -40 },
        'NOTGateNode': { x: 150, y: -40 },
        'XNORGateNode': { x: 250, y: 100 }
    };

    return (
        <div className='toolbox_container'>
            <div className='svg_container'>
                <svg
                    onClick={() => handle_gate_click('AND')}
                    onMouseEnter={() => handle_mouse_hover('AND')}
                    onMouseLeave={handle_mouse_leave}
                    style={{left: `${positions.ANDGateNode.x}px`, top: `${positions.ANDGateNode.y}px`}}
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
                    style={{left: `${positions.ORGateNode.x}px`, top: `${positions.ORGateNode.y}px`}}
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
                    style={{left: `${positions.NOTGateNode.x}px`, top: `${positions.NOTGateNode.y}px`}}
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
                    style={{left: `${positions.XORGateNode.x}px`, top: `${positions.XORGateNode.y}px`}}
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
                    style={{left: `${positions.NANDGateNode.x}px`, top: `${positions.NANDGateNode.y}px`}}
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
                    style={{left: `${positions.NORGateNode.x}px`, top: `${positions.NORGateNode.y}px`}}
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
                    style={{left: `${positions.XNORGateNode.x}px`, top: `${positions.XNORGateNode.y}px`}}
                    width="50" height="25"
                    viewBox="1 -10 100 100">
                    <XnorGate
                        key="xnor"
                        text="XNOR"
                        scale={hovered_gate === 'XNOR' ? 1.15 : 1}
                        border={hovered_gate === 'XNOR' ? '#595959' : 'black'}
                    />
                </svg>
                <div className="input">
                    <GenerateInputNodes setInputNodes={setInputNodes}/>
                </div>
                <div className="input">
                    <GenerateOutputNodes setOutputNodes={setOutputNodes}/>
                </div>
            </div>
        </div>
    );
}