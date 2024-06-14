
import React, { useEffect, useRef, useState } from "react";
import { BaseEdge, EdgeLabelRenderer, useReactFlow, useStore, useNodes } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import { getSmartEdge, pathfindingJumpPointNoDiagonal } from '@tisoap/react-flow-smart-edge'

const GridSmartEdge = ({
                            id,
                            sourceX,
                            sourceY,
                            targetX,
                            targetY,
                            sourcePosition,
                            targetPosition,
                            markerEnd,
                            style = {},
                        }) => {

    const [path, setPath] = useState('');
    const nodes = useNodes();

    useEffect(() => {
        const updateEdgePath = () => {
            const { svgPathString, error } = getSmartEdge({
                sourcePosition,
                targetPosition,
                sourceX,
                sourceY,
                targetX,
                targetY,
                nodes,
                options: {
                    generatePath: pathfindingJumpPointNoDiagonal,
                    gridRatio: 1,
                },
            });

            if (error) {
                setPath(`M${sourceX},${sourceY} L${targetX},${targetY}`);
            } else {
                setPath(svgPathString);
            }
        };

        updateEdgePath();
    }, [sourceX, sourceY, targetX, targetY, nodes, sourcePosition, targetPosition]);

    return (
        <>
            <BaseEdge path={path} markerEnd={markerEnd} style={{ ...style, strokeWidth: 3, stroke: 'black' }} />
            <EdgeLabelRenderer>
                <div
                    ref={useRef(null)}
                    style={{
                        position: "absolute",
                        left: `${sourceX}px`,
                        top: `${sourceY}px`,
                        cursor: "move",
                    }}
                />
            </EdgeLabelRenderer>
        </>
    );
};

export default GridSmartEdge;