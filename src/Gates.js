import './Gate.css';
import React from 'react';
import Draggable from 'react-draggable';

function gate(props, geometrySource) {
    const p = {
        ...props,
        background: props.background || "white",
        border: props.border || "black",
        x: (props.x || 0) + (props.dragging?.delta.dx || 0),
        y: (props.y || 0) + (props.dragging?.delta.dy || 0),
        scale: props.scale || 1.0,
        className: props.dragging ? "Gate dragging" : "Gate",
    };

    return (
        <Draggable>
            <g
                className={p.className}
                transform={`translate(${p.x}, ${p.y}) scale(${p.scale})`}
                onPointerDown={props.handlePointerDown}
                onPointerMove={props.handlePointerMove}
                onPointerUp={props.handlePointerUp}
                data-key={p.key}
                key={p.key}
            >
                {geometrySource(p)}
            </g>
        </Draggable>
    );
}

function AndGate(props) {
    return gate(props, p => (
        <g transform={"translate(-40, -32.5)"}>
            <path
                d="m 0,0 h 30 c 64,0 64,64 2,64 H 0 Z"
                fill={p.background}
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_path"}
            />

            <text
                x={36}
                y={32}
                textAnchor="middle"
                dominantBaseline="middle"
                key={p.key + "_text"}
            >{p.text}</text>
        </g>
    ));
}

function OrGate(props) {
    return gate(props, p => (
        <>
            <path
                d="M 0,64 h 18.5 c 24,0.5 40,-12 60,-32 c -20,-20 -36,-32.5 -60,-32 h -18.5 c 17,21.5 16.5,43 0,64 z"
                fill={p.background}
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_path"}
            />

            <text
                x={40}
                y={32}
                textAnchor="middle"
                dominantBaseline="middle"
                key={p.key + "_text"}
            >{p.text}</text>
        </>
    ));
}

function XorGate(props) {
    return gate(props, p => (
        <>
            <path
                d="M 0,64 h 18.5 c 24,0.5 40,-12 60,-32 c -20,-20 -36,-32.5 -60,-32 h -18.5 c 17,21.5 16.5,43 0,64 z"
                fill={p.background}
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_path1"}
            />
            <path
                d="M -10,0 c 17,21.5 16.5,43 0,64"
                fill="none"
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_path2"}
            />

            <text
                x={40}
                y={32}
                textAnchor="middle"
                dominantBaseline="middle"
                key={p.key + "_text"}
            >{p.text}</text>
        </>
    ));
}

function NandGate(props) {
    return gate(props, p => (
        <>
            <path
                d="m 0,0 h 30 c 64,0 64,64 2,64 H 0 Z"
                fill={p.background}
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_path"}
            />
            <circle
                cx={87}
                cy={32}
                r={8}
                fill="none"
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_circle"}
            />

            <text
                x={36}
                y={32}
                textAnchor="middle"
                dominantBaseline="middle"
                key={p.key + "_text"}
            >{p.text}</text>
        </>
    ));
}

function NorGate(props) {
    return gate(props, p => (
        <>
            <path
                d="M 0,64 h 18.5 c 24,0.5 40,-12 60,-32 c -20,-20 -36,-32.5 -60,-32 h -18.5 c 17,21.5 16.5,43 0,64 z"
                fill={p.background}
                stroke={p.border}
                strokeWidth={4}
            />
            <circle
                cx={88}
                cy={32}
                r={8}
                fill="none"
                stroke={p.border}
                strokeWidth={4}
            />


            <text
                x={40}
                y={32}
                textAnchor="middle"
                dominantBaseline="middle"
            >{p.text}</text>
        </>
    ));
}

function XnorGate(props) {
    return gate(props, p => (
        <>
            <path
                d="M 0,64 h 18.5 c 24,0.5 40,-12 60,-32 c -20,-20 -36,-32.5 -60,-32 h -18.5 c 17,21.5 16.5,43 0,64 z"
                fill={p.background}
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_path1"}

            />
            <path
                d="M -10,0 c 17,21.5 16.5,43 0,64"
                fill="none"
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_path2"}
            />
            <circle
                cx={88}
                cy={32}
                r={8}
                fill={p.background}
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_circle"}
            />

            <text
                x={40}
                y={32}
                textAnchor="middle"
                dominantBaseline="middle"
                key={p.key + "_text"}
            >{p.text}</text>
        </>
    ));
}

function NotGate(props) {
    return gate(props, p => (
        <>
            <path
                d="M 0,0 l 64,32 l -64, 32 Z"
                fill={p.background}
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_path"}
            />
            <circle
                cx={74} cy={32}
                r={8}
                fill="none"
                stroke={p.border}
                strokeWidth={4}
                key={p.key + "_circle"}
            />

            <text
                x={22}
                y={32}
                textAnchor="middle"
                dominantBaseline="middle"
                key={p.key + "_text"}
            >{p.text}</text>
        </>
    ))
}

export { AndGate, OrGate, XorGate, NandGate, NorGate, XnorGate, NotGate };
