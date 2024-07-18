import React from 'react';
import { routeEdge } from '../circuits/routing.js';

export default ({ fromX, fromY, toX, toY }) => {
    const { svgPathString } = routeEdge({
        sourceX: fromX, sourceY: fromY,
        targetX: toX, targetY: toY,
        sourcePosition: 'right', targetPosition: 'left',
    });

    return (
        <g>
            <path
                fill="none"
                strokeWidth={3}
                stroke={'#0008'}
                d={svgPathString}
            />
        </g>
    );
};
