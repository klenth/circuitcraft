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
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240} onResize={handleResize} />
                <div className='rotate_handle_container'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                {/*console.log("GateNode.js rotation " + rotation)*/}
                <div>
                    <Handle type="target" id="a" style={{top: '25%', left: '11%'}} isConnectable={isConnectable}/>
                    <Handle type="target" id="b" style={{top: '65%', left: '11%'}} isConnectable={isConnectable}/>
                    <div>
                        <svg className='' width={size.width} height={size.height}>
                            <AndGate key="and"
                                     x={size.width + 208}
                                     y={ size.height + 156 }
                                     text="AND"
                                     width={size.width - 10}
                                     height={size.height - 10}
                            />
                            {/*At min width of  110, x = size.width - 52. At mid width of 220, x = size.width + 17. At max width of 330, x = size.width + 208
                               At min height of 80, y = size.height - 40. At mid height of 160, y = size.height + 12. At max height of 240, y = size.height + 156*/}
                        </svg>
                        {console.log(`Width: ${size.width},\nHeight: ${size.height},\nx: ${size.width - 52},\ny: ${size.height - 40},\nWidth of gate: ${size.width - 10},\nHeight of gate: ${size.height - 10}`)}

                    </div>
                    <Handle type="source" id="z" style={{top: '45.5%', left: '93%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    );
}


export function ORGateNode({ id, isConnectable }) {
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
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node' onClick={() => setIsHovered(true)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240} onResize={handleResize} />
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
                                    width={size.width - 10}
                                    height={size.height - 10}
                            />
                            {/*At min width of  110, x = 18. At mid width of 220, x = size.width + 17. At max width of 330, x = size.width + 208
                               At min height of 80, y = 8. At mid height of 160, y = size.height + 12. At max height of 240, y = size.height + 156*/}
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '46%', left: '93%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    );
}

export function XORGateNode({ id, isConnectable }) {
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
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node' onClick={() => setIsHovered(true)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240} onResize={handleResize} />
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
                                     width={size.width - 10}
                                     height={size.height - 10}
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '46%', left: '95%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    );
}

export function NANDGateNode({ id, isConnectable }) {
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
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node' onClick={() => setIsHovered(true)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240} onResize={handleResize} />
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
                                      width={size.width - 10}
                                      height={size.height - 10}
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '45.5%', left: '99%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    );
}

export function NORGateNode({ id, isConnectable }) {
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
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node' onClick={() => setIsHovered(true)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240} onResize={handleResize} />
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
                                     width={size.width - 10}
                                     height={size.height - 10}
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '46%', left: '102%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    );
}

export function NOTGateNode({ id, isConnectable }) {
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
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node' onClick={() => setIsHovered(true)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240} onResize={handleResize} />
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
                                     width={size.width - 10}
                                     height={size.height - 10}
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '46%', left: '96%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    );
}

export function XNORGateNode({ id, isConnectable }) {
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
            <div style={{ transform: `rotate(${rotation}deg)` }} className='node' onClick={() => setIsHovered(true)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240} onResize={handleResize} />
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
                                      width={size.width - 10}
                                      height={size.height - 10}
                            />
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '46%', left: '104%'}} isConnectable={isConnectable} />
                </div>
            </div>
        </>
    );
}

export function JunctionGateNode ({ id, isConnectable }) {
    return (
        <>
            <div>
                <Handle type="source" id="a" className='junction_handle' style={{top: '50%', left: '50%'}} isConnectable={isConnectable}/>
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