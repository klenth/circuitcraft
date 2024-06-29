import { useState, useEffect, useCallback } from 'react';
import { Handle, Position, useUpdateNodeInternals, useReactFlow } from 'reactflow';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate } from '../gates/Gates';
import './Canvas.css';

const handleStyle = { top: 20, left: 3 };

function useConnectionStatus(nodeId) {
    const [isConnected, setIsConnected] = useState({ a: false, b: false });
    const { getEdges } = useReactFlow();

    useEffect(() => {
        const updateConnectionStatus = () => {
            const edges = getEdges();
            const connections = { a: false, b: false };
            edges.forEach(edge => {
                if (edge.target === nodeId) {
                    if (edge.targetHandle === 'a') connections.a = true;
                    if (edge.targetHandle === 'b') connections.b = true;
                }
            });
            setIsConnected(connections);
        };

        updateConnectionStatus();
    }, [getEdges, nodeId]);

    return isConnected;
}

// I've changed the inputs to start at a and go to m (if needed) and outputs to start
// at z and go to n (if needed), makes it easier when making 3 input gates

export function ANDGateNode ({ id, isConnectable }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);
    // const [rotatable, setRotatable] = useState(!!data.rotatable ?? false);

    const handleRotateClick = () => {
        //when you click the rotate button, it rotates 90 deg to the right
        setRotation((prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };
    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="target" id="a" style={{top: '25%', left: '11%'}} isConnectable={isConnectable}/>
                    <Handle type="target" id="b" style={{top: '65%', left: '11%'}} isConnectable={isConnectable}/>
                    <div>
                        <svg className='gate_svg'>
                            <AndGate key="and"
                                     x={58}
                                     y={40}
                                     text="AND"
                            />
                        </svg>
                    </div>
                    <Handle type="source" id="z" style={{top: '45%', left: '93%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    )
}

export function ORGateNode ({ id, isConnectable }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);

    const handleRotateClick = () => {
        setRotation((prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };
    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="target" id="a" style={{top: '26%', left: '19%'}} isConnectable={isConnectable}/>
                    <Handle type="target" id="b" style={{top: '66%', left: '19%'}} isConnectable={isConnectable}/>

                    <div>
                        <svg className='gate_svg'>
                            <OrGate key="or"
                                    x={18}
                                    y={8}
                                    text="OR"
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '46%', left: '93%'}} isConnectable={isConnectable} />

                </div>
            </div>
        </>
    )
}

export function XORGateNode ({ id, isConnectable }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);

    const handleRotateClick = () => {
        setRotation((prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };
    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="target" id="a" style={{top: '26%', left: '12%'}} isConnectable={isConnectable}/>
                    <Handle type="target" id="b" style={{top: '66%', left: '12%'}} isConnectable={isConnectable}/>

                    <div>
                        <svg className='gate_svg'>
                            <XorGate key="xor"
                                     x={20}
                                     y={8}
                                     text="XOR"
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '46%', left: '95%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    )
}

export function NANDGateNode ({ id, isConnectable }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);

    const handleRotateClick = () => {
        setRotation((prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };
    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container not_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="target" id="a" style={{top: '25%', left: '2%'}} isConnectable={isConnectable}/>
                    <Handle type="target" id="b" style={{top: '64%', left: '2%'}} isConnectable={isConnectable}/>

                    <div>
                        <svg className='gate_svg'>
                            <NandGate key="nand"
                                      x={8}
                                      y={8}
                                      text="NAND"
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '45%', left: '99%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    )
}

export function NORGateNode ({ id, isConnectable }) { //changed-----------------------------------------
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);

    const handleRotateClick = () => {
        setRotation((prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };
    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container curved_gate_styling not_curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>

                <div>
                    <Handle type="target" id="a" style={{top: '26%', left: '12%'}} isConnectable={isConnectable}/>
                    <Handle type="target" id="b" style={{top: '66%', left: '12%'}} isConnectable={isConnectable}/>

                    <div>
                        <svg className='gate_svg'>
                            <NorGate key="nor"
                                     x={10}
                                     y={8}
                                     text="NOR"
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '46%', left: '102%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    )
}

export function NOTGateNode ({ id, isConnectable }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);

    const handleRotateClick = () => {
        setRotation((prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };
    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container not_curved_gate_styling not_gate'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="target" id="a" style={{top: '46%', left: '11%'}} isConnectable={isConnectable}/>

                    <div>
                        <svg className='gate_svg'>
                            <NotGate key="not"
                                     x={18}
                                     y={8}
                                     text="NOT"
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '46%', left: '96%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    )
}

export function XNORGateNode ({ id, isConnectable }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const [rotation, setRotation] = useState(0);

    const handleRotateClick = () => {
        setRotation((prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };
    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container not_curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="target" id="a" style={{top: '26%', left: '5%'}} isConnectable={isConnectable}/>
                    <Handle type="target" id="b" style={{top: '66%', left: '5%'}} isConnectable={isConnectable}/>
                    <div>
                        <svg className='gate_svg'>
                            <XnorGate key="xnor"
                                      x={12}
                                      y={8}
                                      text="XNOR"
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '46%', left: '104%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    )
}