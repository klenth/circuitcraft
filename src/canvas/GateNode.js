import { useState, useEffect, useCallback, useContext } from 'react';
import { Handle, Position, useUpdateNodeInternals, useReactFlow, NodeResizer } from 'reactflow';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate, Junction } from '../gates/Gates';
import './Canvas.css';
import { useRotation } from './RotationContext';

const handleStyle = { top: 20, left: 3 };

/* I've changed the inputs to start at a and go to m (if needed) and outputs to start
   at z and go to n (if needed), makes it easier when making 3 input gates

   Also, please do not change anything relating to the position of the handles on the
   resizing nodes!
   Handle type="target" id="a" style={{top: '25%', left: '11%'}} isConnectable={isConnectable}
                                        ^^^^^^^^^^^^^^^^^^^^^
                                        That part in particular
   I will cry, don't do it

                                                                    -Makenna
*/

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
            <div style={{ transform: `rotate(${rotation}deg)`,
                          minWidth: '110px',
                          minHeight: '80px',
                          width: size.width,
                          height: size.height }}
                 className='node'
                 onClick={() => setIsHovered(!isHovered)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240} onResize={handleResize} />
                <div className='rotate_handle_container'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="source"/*"target**/ id="a" style={{top: '30%', left: '11%'}} isConnectable={isConnectable}/>
                    <Handle type="source"/*"target**/ id="b" style={{top: '70%', left: '11%'}} isConnectable={isConnectable}/>
                    <div>
                        <svg  width={size.width} height={size.height}>
                            <AndGate key="and"
                                     /*x={ (24/11) * size.width - 182 }
                                     y={ (353/160) * size.height - 133.5 }*/
                                     x={ ((61/12100) * size.width * size.width) - ((2/55) * size.width) + 1 }
                                     y={ (0.00734375 * size.height * size.height) - (0.14375 * size.height) + 8.3 }
                                     width={size.width - 10}
                                     height={size.height - 10}
                            />
                            {/*At min width of  110, x = 58. At mid width of 220, x = size.width + 17 (237). At max width of 330, x = size.width + 208 (538)
                               At min height of 80, y = 43. At mid height of 160, y = 172.5. At max height of 240, y = 396*/}
                        </svg>
                        {console.log(`Width: ${size.width},\nHeight: ${size.height},\nx: ${size.width - 52},\ny: ${size.height - 40},\nWidth of gate: ${size.width - 10},\nHeight of gate: ${size.height - 10}`)}

                    </div>
                    <Handle type="source" id="z" style={{top: '50%', left: '93%'}} isConnectable={isConnectable} />
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
            <div style={{ transform: `rotate(${rotation}deg)`,
                          minWidth: '110px',
                          minHeight: '80px',
                          width: size.width,
                          height: size.height }}
                 className='node'
                 onClick={() => setIsHovered(!isHovered)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240} onResize={handleResize} />
                <div className='rotate_handle_container curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick} />
                </div>
                <div>
                    <Handle type="source"/*"target**/ id="a" style={{top: '30%', left: '19%'}} isConnectable={isConnectable}/>
                    <Handle type="source"/*"target**/ id="b" style={{top: '70%', left: '19%'}} isConnectable={isConnectable}/>

                    <div>
                        <svg  width={size.width} height={size.height}>
                            <OrGate key="or"
                                    x={ (0.00491736 * size.width * size.width) - (0.39545455 * size.width) + 2 }
                                    y={ (0.00710937 * size.height * size.height) - (0.51875 * size.height) + 6 }
                                    width={size.width - 10}
                                    height={size.height - 10}
                            />
                            {/*At min width of  110, x = 18. At mid width of 220, x = 153. At max width of 330, x = 407
                               At min height of 80, y = 10. At mid height of 160, y = 105. At max height of 240, y = 291*/}
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '50%', left: '93%'}} isConnectable={isConnectable} />
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
            <div style={{ transform: `rotate(${rotation}deg)`,
                          minWidth: '110px',
                          minHeight: '80px',
                          width: size.width,
                          height: size.height }}
                 className='node'
                 onClick={() => setIsHovered(!isHovered)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240}
                             onResize={handleResize}/>
                <div className='rotate_handle_container curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick}/>
                </div>
                <div>
                    <Handle type="source"/*"target**/ id="a" style={{top: '30%', left: '12%'}} isConnectable={isConnectable}/>
                    <Handle type="source"/*"target**/ id="b" style={{top: '70%', left: '12%'}} isConnectable={isConnectable}/>

                    <div>
                        <svg  width={size.width} height={size.height}>
                            <XorGate key="xor"
                                     x={ (0.00516529 * size.width * size.width) - (0.46818182 * size.width) + 8 }
                                     y={ (0.00710937 * size.height * size.height) - (0.51875 * size.height) + 6 }
                                     width={size.width - 10}
                                     height={size.height - 10}
                            />
                            {/*At min width of  110, x = 19. At mid width of 220, x = 155. At max width of 330, x = 416
                               At min height of 80, y = 10. At mid height of 160, y = 105. At max height of 240, y = 291*/}
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '50%', left: '95%'}} isConnectable={isConnectable}/>
                </div>
            </div>
        </>
    );
}

export function NANDGateNode({id, isConnectable}) {
    const updateNodeInternals = useUpdateNodeInternals();
    const {rotations, setRotation} = useRotation();
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
            <div style={{ transform: `rotate(${rotation}deg)`,
                          minWidth: '110px',
                          minHeight: '80px',
                          width: size.width,
                          height: size.height }}
                 className='node'
                 onClick={() => setIsHovered(!isHovered)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240}
                             onResize={handleResize}/>
                <div className='rotate_handle_container not_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick}/>
                </div>
                <div>
                    <Handle type="source"/*"target**/ id="a" style={{top: '30%', left: '2%'}} isConnectable={isConnectable}/>
                    <Handle type="source"/*"target**/ id="b" style={{top: '70%', left: '2%'}} isConnectable={isConnectable}/>

                    <div>
                        <svg  width={size.width} height={size.height}>
                            <NandGate key="nand"
                                      x={ (0.00495868 * size.width * size.width) - (0.50909091 * size.width) + 4 }
                                      y={ (0.00738281 * size.height * size.height) - (0.6156245 * size.height) + 12.5 }
                                      width={size.width - 10}
                                      height={size.height - 10}
                            />
                            {/*At min width of  110, x = 8. At mid width of 220, x = 132. At max width of 330, x = 376
                               At min height of 80, y = 10.5. At mid height of 160, y = 103. At max height of 240, y = 290*/}
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '50%', left: '99%'}} isConnectable={isConnectable}/>
                </div>
            </div>
        </>
    );
}

export function NORGateNode({id, isConnectable}) {
    const updateNodeInternals = useUpdateNodeInternals();
    const {rotations, setRotation} = useRotation();
    const rotation = rotations[id] || 0;
    const [isHovered, setIsHovered] = useState(false);
    const [size, setSize] = useState({width: 110, height: 80 });

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
            <div style={{ transform: `rotate(${rotation}deg)`,
                          minWidth: '110px',
                          minHeight: '80px',
                          width: size.width,
                          height: size.height }}
                 className='node'
                 onClick={() => setIsHovered(!isHovered)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240}
                             onResize={handleResize}/>
                <div className='rotate_handle_container curved_gate_styling not_curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick}/>
                </div>
                <div>
                    <Handle type="source"/*"target**/ id="a" style={{top: '30%', left: '12%'}} isConnectable={isConnectable}/>
                    <Handle type="source"/*"target**/ id="b" style={{top: '70%', left: '12%'}} isConnectable={isConnectable}/>

                    <div>
                        <svg  width={size.width} height={size.height}>
                            <NorGate key="nor"
                                     x={ (0.00504132 * size.width * size.width) - (0.54545455 * size.width) + 9 }
                                     y={ (0.00710937 * size.height * size.height) - (0.51875 * size.height) + 6 }
                                     width={size.width - 10}
                                     height={size.height - 10}
                            />
                            {/*At min width of  110, x = 10. At mid width of 220, x = 133. At max width of 330, x = 378
                               At min height of 80, y = 10. At mid height of 160, y = 105. At max height of 240, y = 291*/}
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '50%', left: '102%'}} isConnectable={isConnectable}/>
                </div>
            </div>
        </>
    );
}

export function NOTGateNode({id, isConnectable}) {
    const updateNodeInternals = useUpdateNodeInternals();
    const {rotations, setRotation} = useRotation();
    const rotation = rotations[id] || 0;
    const [isHovered, setIsHovered] = useState(false);
    const [size, setSize] = useState({width: 110, height: 80 });

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
            <div style={{ transform: `rotate(${rotation}deg)`,
                          minWidth: '110px',
                          minHeight: '80px',
                          width: size.width,
                          height: size.height }}
                 className='node'
                 onClick={() => setIsHovered(!isHovered)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240}
                             onResize={handleResize}/>
                <div className='rotate_handle_container not_curved_gate_styling not_gate'>
                    <div className='rotate_handle' onClick={handleRotateClick}/>
                </div>
                <div>
                    <Handle type="source"/*"target**/ id="a" style={{top: '50%', left: '11%'}} isConnectable={isConnectable}/>

                    <div>
                        <svg  width={size.width} height={size.height}>
                            <NotGate key="not"
                                     x={ (0.00512397 * size.width * size.width) - (0.47272727 * size.width) + 8 }
                                     y={ (0.00734375 * size.height * size.height) - (0.6 * size.height) + 11 }
                                     width={size.width - 10}
                                     height={size.height - 10}
                            />
                            {/*At min width of  110, x = 18. At mid width of 220, x = 152. At max width of 330, x = 410
                               At min height of 80, y = 10. At mid height of 160, y = 103. At max height of 240, y = 290*/}
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '50%', left: '96%'}} isConnectable={isConnectable}/>
                </div>
            </div>
        </>
    );
}

export function XNORGateNode({id, isConnectable}) {
    const updateNodeInternals = useUpdateNodeInternals();
    const {rotations, setRotation} = useRotation();
    const rotation = rotations[id] || 0;
    const [isHovered, setIsHovered] = useState(false);
    const [size, setSize] = useState({width: 110, height: 80 });

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
            <div style={{ transform: `rotate(${rotation}deg)`,
                          minWidth: '110px',
                          minHeight: '80px',
                          width: size.width,
                          height: size.height }}
                 className='node'
                 onClick={() => setIsHovered(!isHovered)}>
                <NodeResizer isVisible={isHovered} minWidth={110} minHeight={80} maxWidth={330} maxHeight={240}
                             onResize={handleResize}/>
                <div className='rotate_handle_container not_curved_gate_styling'>
                    <div className='rotate_handle' onClick={handleRotateClick}/>
                </div>
                <div>
                    <Handle type="source"/*"target**/ id="a" style={{top: '30%', left: '5%'}} isConnectable={isConnectable}/>
                    <Handle type="source"/*"target**/ id="b" style={{top: '70%', left: '5%'}} isConnectable={isConnectable}/>
                    <div>
                        <svg  width={size.width} height={size.height}>
                            <XnorGate key="xnor"
                                      x={ (0.00475207 * size.width * size.width) - (0.45 * size.width) + 1 }
                                      y={ (0.0071875 * size.height * size.height) - (0.55 * size.height) + 8 }
                                      width={size.width - 20}
                                      height={size.height - 10}
                            />
                            {/*At min width of  110, x = 9. At mid width of 220, x = 132. At max width of 330, x = 370
                               At min height of 80, y = 10. At mid height of 160, y = 104. At max height of 240, y = 290*/}
                        </svg>
                    </div>

                    <Handle type="source" id="z" style={{top: '50%', left: '99%'}} isConnectable={isConnectable}/>
                </div>
            </div>
        </>
    );
}

export function JunctionGateNode({id, isConnectable}) {
    return (
        <>
            <div>
                <Handle type="source" id="top" className='junction_handle' style={{top: '25%', left: '50%'}}
                        isConnectable={isConnectable} position={"top"} />
                <Handle type="source" id="right" className='junction_handle' style={{top: '50%', right: '25%'}}
                        isConnectable={isConnectable} position={"right"} />
                <Handle type="source" id="bottom" className='junction_handle' style={{bottom: '25%', left: '50%'}}
                        isConnectable={isConnectable} position={"bottom"} />
                <Handle type="source" id="left" className='junction_handle' style={{top: '50%', left: '25%'}}
                        isConnectable={isConnectable} position={"left"}/>

                {/*<Handle type="source" id="z" className='junction_handle' style={{top: '50%', left: '50%'}}*/}
                {/*        isConnectable={isConnectable}/>*/}
                <div>
                    <svg className='junction_svg'>
                    <Junction key="junction"
                                x={-35}
                                y={-28}
                    />
                </svg>
                </div>
            </div>
        </>
    )
}