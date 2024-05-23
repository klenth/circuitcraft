import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate } from './gates/Gates';
import './App.css'


const handleStyle = { left: 10 };

export function ANDGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />

            <div>
            <svg className='gate_svg'>
                <AndGate key="and" 
                    x={58}
                    y={40}
                    text="AND"
                />
            </svg>
            </div>
            
            <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={handleStyle}
            isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    )
}

export function ORGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />

            <div>
            <svg className='gate_svg'>
                <OrGate key="or" 
                    x={18}
                    y={8}
                    text="OR"
                />
            </svg>
            </div>
            
            <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={handleStyle}
            isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    )
}

export function XORGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />

            <div>
            <svg className='gate_svg'>
                <XorGate key="xor" 
                    x={20}
                    y={8}
                    text="XOR"
                />
            </svg>
            </div>
            
            <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={handleStyle}
            isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    )
}

export function NANDGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />

            <div>
            <svg className='gate_svg'>
                <NandGate key="nand" 
                    x={8}
                    y={8}
                    text="NAND"
                />
            </svg>
            </div>
            
            <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={handleStyle}
            isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    )
}

export function NORGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />

            <div>
            <svg className='gate_svg'>
                <NorGate key="nor" 
                    x={10}
                    y={8}
                    text="NOR"
                />
            </svg>
            </div>
            
            <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={handleStyle}
            isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    )
}

export function NOTGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />

            <div>
            <svg className='gate_svg'>
                <NotGate key="not" 
                    x={18}
                    y={8}
                    text="NOT"
                />
            </svg>
            </div>
            
            <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={handleStyle}
            isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    )
}

export function XNORGateNode ({ isConnectable }) {

    return (
        <div>
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />

            <div>
            <svg className='gate_svg'>
                <XnorGate key="xnor" 
                    x={12}
                    y={8}
                    text="XNOR"
                />
            </svg>
            </div>
            
            <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={handleStyle}
            isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    )
}

