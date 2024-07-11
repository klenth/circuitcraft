import { useState, useEffect, useCallback, useContext } from 'react';
import { Handle, Position, useUpdateNodeInternals, useReactFlow, NodeResizer } from 'reactflow';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate, Junction } from '../gates/Gates';
import './Canvas.css';
import { useRotation } from './RotationContext';


const handleStyle = { top: 20, left: 3 };

// I've changed the inputs to start at a and go to m (if needed) and outputs to start
// at z and go to n (if needed), makes it easier when making 3 input gates

export function ANDGateNode ({ id, isConnectable, data }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const { rotations, setRotation } = useRotation();
    const rotation = rotations[id] || 0;
    const [isHovered, setIsHovered] = useState(false);
    const [size, setSize] = useState({ width: 110, height: 80 });

    const handleRotateClick = () => {
        setRotation(id, (prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };


    const handleResize = (event, { width, height }) => {
        setSize({ width, height });
        updateNodeInternals(id);
    };

    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }}
                 className='node'
                 onClick={() => setIsHovered(true)}>
                <NodeResizer isVisible={isHovered} minWidth={100} minHeight={70} onResize={handleResize} />
                <div className='rotate_handle_container'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="target" id="a" style={{top: '25%', left: '11%'}} isConnectable={isConnectable}/>
                    <Handle type="target" id="b" style={{top: '65%', left: '11%'}} isConnectable={isConnectable}/>
                    <div>
                        <svg className='' width={size.width} height={size.height}>
                            <AndGate key="and" x={size.width - 52} y={size.height - 40} text="" width={size.width - 10} height={size.height - 10} />
                        </svg>

                    </div>
                    <Handle type="source" id="z" style={{top: '45.5%', left: '93%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    );
}


export function ORGateNode ({ id, isConnectable }) {
    const updateNodeInternals = useUpdateNodeInternals();
    const { rotations, setRotation } = useRotation();
    const rotation = rotations[id] || 0;

    const handleRotateClick = () => {
        setRotation(id, (prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };
    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="target" id="a" style={{top: '26.2%', left: '19%'}} isConnectable={isConnectable}/>
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
    const { rotations, setRotation } = useRotation();
    const rotation = rotations[id] || 0;

    const handleRotateClick = () => {
        setRotation(id, (prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };

    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="target" id="a" style={{top: '26.2%', left: '12%'}} isConnectable={isConnectable}/>
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
    const { rotations, setRotation } = useRotation();
    const rotation = rotations[id] || 0;

    const handleRotateClick = () => {
        setRotation(id, (prevRotation) => (prevRotation + 90) % 360);
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

                    <Handle type="source" id="z" style={{top: '45.5%', left: '99%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    )
}

export function NORGateNode ({ id, isConnectable }) { //changed-----------------------------------------
    const updateNodeInternals = useUpdateNodeInternals();
    const { rotations, setRotation } = useRotation();
    const rotation = rotations[id] || 0;

    const handleRotateClick = () => {
        setRotation(id, (prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };
    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container curved_gate_styling not_curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>

                <div>
                    <Handle type="target" id="a" style={{top: '26.2%', left: '12%'}} isConnectable={isConnectable}/>
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
    const { rotations, setRotation } = useRotation();
    const rotation = rotations[id] || 0;

    const handleRotateClick = () => {
        setRotation(id, (prevRotation) => (prevRotation + 90) % 360);
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
    const { rotations, setRotation } = useRotation();
    const rotation = rotations[id] || 0;

    const handleRotateClick = () => {
        setRotation(id, (prevRotation) => (prevRotation + 90) % 360);
        updateNodeInternals(id);
    };
    return (
        <>
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node'>
                <div className='rotate_handle_container not_curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="target" id="a" style={{top: '26.2%', left: '5%'}} isConnectable={isConnectable}/>
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

export function JunctionGateNode ({ isConnectable }) {
    return (
        <>
            <div>
                <Handle type="source" id="a" className='junction_handle' style={{top: '50%', left: '50%'}} isConnectable={isConnectable}/>
                <Handle type="target" id="z" className='junction_handle' style={{top: '50%', left: '50%'}} isConnectable={isConnectable}/>
                <div>
                <svg className='junction_svg'>
                    <Junction key="junction"
                                x={-35}
                                y={-25}
                    />
                </svg>
                </div>
            </div>
        </>
    )
}