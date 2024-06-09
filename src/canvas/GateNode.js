import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate } from '../gates/Gates';
import './Canvas.css'


const handleStyle = { left: 3, top: 20 };

export function ANDGateNode ({ isConnectable }) {

    return (
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
            
            <Handle type="source" id="c" style={{left: '93%', top: '46%'}} isConnectable={isConnectable} />
        </div>
    )
}

export function ORGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" id="a" style={{top: '25%', left: '19%'}} isConnectable={isConnectable}/>
            <Handle type="target" id="b" style={{top: '64%', left: '19%'}} isConnectable={isConnectable}/>
            <div>
            <svg className='gate_svg'>
                <OrGate key="or" 
                    x={18}
                    y={8}
                    text="OR"
                />
            </svg>
            </div>
            
            <Handle type="source" id="c" style={{left: '93%', top: '46%'}} isConnectable={isConnectable} />

        </div>
    )
}

export function XORGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" id="a" style={{top: '25%', left: '12%'}} isConnectable={isConnectable}/>
            <Handle type="target" id="b" style={{top: '64%', left: '12%'}} isConnectable={isConnectable}/>

            <div>
            <svg className='gate_svg'>
                <XorGate key="xor" 
                    x={20}
                    y={8}
                    text="XOR"
                />
            </svg>
            </div>
            
            <Handle type="source" id="c" style={{left: '95%', top: '46%'}} isConnectable={isConnectable} />
        </div>
    )
}

export function NANDGateNode ({ isConnectable }) {

    return (
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
            
            <Handle type="source" id="c" style={{left: '99%', top: '47%'}} isConnectable={isConnectable} />
        </div>
    )
}

export function NORGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" id="a" style={{top: '25%', left: '12%'}} isConnectable={isConnectable}/>
            <Handle type="target" id="b" style={{top: '64%', left: '12%'}} isConnectable={isConnectable}/>

            <div>
            <svg className='gate_svg'>
                <NorGate key="nor" 
                    x={10}
                    y={8}
                    text="NOR"
                />
            </svg>
            </div>
            
            <Handle type="source" id="c" style={{left: '102%', top: '47%'}} isConnectable={isConnectable} />
        </div>
    )
}

export function NOTGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" id="a" style={{top: '25%', left: '11%'}} isConnectable={isConnectable}/>
            <Handle type="target" id="b" style={{top: '64%', left: '11%'}} isConnectable={isConnectable}/>

            <div>
            <svg className='gate_svg'>
                <NotGate key="not" 
                    x={18}
                    y={8}
                    text="NOT"
                />
            </svg>
            </div>
            
            <Handle type="source" id="c" style={{left: '97%', top: '47%'}} isConnectable={isConnectable} />
        </div>
    )
}

export function XNORGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" id="a" style={{top: '25%', left: '4%'}} isConnectable={isConnectable}/>
            <Handle type="target" id="b" style={{top: '63%', left: '5%'}} isConnectable={isConnectable}/>

            <div>
            <svg className='gate_svg'>
                <XnorGate key="xnor" 
                    x={12}
                    y={8}
                    text="XNOR"
                />
            </svg>
            </div>
            
            <Handle type="source" id="c" style={{left: '104%', top: '47%'}} isConnectable={isConnectable} />
        </div>
    )
}

