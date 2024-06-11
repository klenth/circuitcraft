import React from 'react';
import { getMarkerEnd } from 'reactflow';

const CustomSmartEdge = ({
                             id,
                             sourceX,
                             sourceY,
                             targetX,
                             targetY,
                             sourcePosition,
                             targetPosition,
                             style = {},
                             markerEnd,
                             data,
                         }) => {
    const calculateEdgePath = (sourceX, sourceY, targetX, targetY, nodes) => {
        const midX = (sourceX + targetX) / 2;
        const midY = (sourceY + targetY) / 2;
        let path = `M${sourceX},${sourceY} L${midX},${sourceY} L${midX},${targetY} L${targetX},${targetY}`;

        if (nodes && nodes.length > 0) {
            nodes.forEach(node => {
                const { position, width, height } = node;
                const nodeLeft = position.x;
                const nodeRight = position.x + width;
                const nodeTop = position.y;
                const nodeBottom = position.y + height;

                if (midX > nodeLeft && midX < nodeRight) {
                    if ((sourceY < nodeTop && targetY > nodeBottom) || (sourceY > nodeBottom && targetY < nodeTop)) {
                        const offset = 20;
                        if (sourceY < targetY) {
                            path = `M${sourceX},${sourceY} L${midX},${sourceY} L${midX},${nodeTop - offset} L${targetX},${nodeTop - offset} L${targetX},${targetY}`;
                        } else {
                            path = `M${sourceX},${sourceY} L${midX},${sourceY} L${midX},${nodeBottom + offset} L${targetX},${nodeBottom + offset} L${targetX},${targetY}`;
                        }
                    }
                }
            });
        }

        return path;
    };

    const nodes = data ? data.nodes : []; // Default to an empty array if data or nodes are not provided
    const path = calculateEdgePath(sourceX, sourceY, targetX, targetY, nodes);
    const markerEndUrl = getMarkerEnd(markerEnd);

    return (
        <g className="react-flow__edge">
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={path}
                markerEnd={markerEndUrl}
            />
        </g>
    );
};

export default CustomSmartEdge;
