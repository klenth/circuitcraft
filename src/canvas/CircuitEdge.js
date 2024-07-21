import React, { useEffect, useRef, useState } from "react";
import { EdgeLabelRenderer, useReactFlow, useNodes } from "reactflow";
import { MouseResponsiveEdge } from './MouseResponsiveEdge';
import { useRotation } from './RotationContext';
import { routeEdge, renderPath } from '../circuits/routing.js';

const CircuitEdge = ({
                           id,
                           sourceX,
                           sourceY,
                           targetX,
                           targetY,
                           sourcePosition,
                           targetPosition,
                           markerEnd,
                           style = {},
                           source,
                           target,
                           data,
                       }) => {
    const [path, setPath] = useState('');
    const [points, setPoints] = useState(null);
    const [drag, setDrag] = useState(null);
    const nodes = useNodes();
    const flow = useReactFlow();

    // Access the rotations context
    const { rotations } = useRotation();
    // Access the nodes and type information
    const sourceNode = nodes.find(node => node.id === source);
    const sourceGateType = sourceNode?.type;

    const rotationAdjustments = {
        270: { source: { x: -5.5, y: 0 }, target: { x: -5.5, y: 13 } },
        180: { source: { x: -5.5, y: 1.5 }, target: { x: 5.5, y: 1.5 } },
        90: { source: { x: -5.5, y: 13 }, target: { x: -5.5, y: 1 } },
        0: { source: { x: 6, y: 1.5 }, target: { x: -6, y: 1.5 } },
    };

    //for fine-tuning later. It gives an error sometimes saying the following:
    //Uncaught TypeError: Cannot destructure property 'sourceX' of 'getHandleConnectionPoint(...)' as it is undefined.

    function getHandleConnectionPoint(sourceX, sourceY, targetX, targetY, sourceRotation, targetRotation) {
        const sourceAdjustment = rotationAdjustments[sourceRotation] || { x: 0, y: 0 };
        const targetAdjustment = rotationAdjustments[targetRotation] || { x: 0, y: 0 };

        if (sourceGateType === 'input'){
            sourceAdjustment.source.y = -1;
        }
        if (sourceGateType === 'JunctionGateNode'){
            console.log("Junction gate is called");
            sourceAdjustment.source.x = 0;
            sourceAdjustment.source.y = 6;
        }

        return {
            sourceX: sourceX + sourceAdjustment.source.x,
            sourceY: sourceY + sourceAdjustment.source.y,
            targetX: targetX + targetAdjustment.target.x,
            targetY: targetY + targetAdjustment.target.y,
        };
    }

    const updateEdgePath = () => {

        const sourceRotation = rotations[source] || 0;
        const targetRotation = rotations[target] || 0;


        const { sourceX: newSourceX, sourceY: newSourceY, targetX: newTargetX, targetY: newTargetY } =
        getHandleConnectionPoint(sourceX, sourceY, targetX, targetY, sourceRotation, targetRotation);

        const { svgPathString, error, points } = routeEdge({
            sourcePosition, targetPosition,
            sourceX: newSourceX, sourceY: newSourceY,
            targetX: newTargetX, targetY: newTargetY
        });

        if (error) {
            setPath(`M${sourceX},${sourceY} L${targetX},${targetY}`);
            setPoints([]);
        } else {
            setPath(svgPathString);
            setPoints(points);
        }
    };

    // removed dependency on nodes as any time any node is changed, *all* edges get reset!
    useEffect(
        updateEdgePath,
        [sourceX, sourceY, targetX, targetY, /*nodes,*/ sourcePosition, targetPosition]
    );

    let renderedPath = path;

    if (drag) {
        const draggedPoints = applyDrag({ points, drag });

        const sourceRotation = rotations[source] || 0;
        const targetRotation = rotations[target] || 0;


        const { sourceX: newSourceX, sourceY: newSourceY, targetX: newTargetX, targetY: newTargetY } =
        getHandleConnectionPoint(sourceX, sourceY, targetX, targetY, sourceRotation, targetRotation);

        renderedPath = renderPath({
            sourceX: newSourceX, sourceY: newSourceY,
            points: draggedPoints,
            targetX: newTargetX, targetY: newTargetY
        });
    }

    const handlePointerDown = event => {
        event.target.setPointerCapture(event.pointerId);
        setDrag(newDrag({ event, points, flow }));
        event.preventDefault();
        event.stopPropagation();
    };

    const handlePointerMove = event => {
        if (drag) {
            const coords = flow.screenToFlowPosition({ x: event.pageX, y: event.pageY });
            setDrag({ ...drag, currentX: coords.x, currentY: coords.y });
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handlePointerUp = event => {
        if (drag) {
            const draggedPoints = applyDrag({ points, drag });
            setPoints(applyDrag({ points, drag }));

            const sourceRotation = rotations[source] || 0;
            const targetRotation = rotations[target] || 0;

            const { sourceX: newSourceX, sourceY: newSourceY, targetX: newTargetX, targetY: newTargetY } =
            getHandleConnectionPoint(sourceX, sourceY, targetX, targetY, sourceRotation, targetRotation);
            setPath(renderPath({
                sourceX: newSourceX, sourceY: newSourceY,
                points: draggedPoints,
                targetX: newTargetX, targetY: newTargetY
            }));
            setDrag(null);
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return (
        <>
            <MouseResponsiveEdge
                path={renderedPath}
                markerEnd={markerEnd}
                style={{ ...style, strokeWidth: 3 }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            />
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

function newDrag({ event, points, flow }) {
    const coords = flow.screenToFlowPosition({ x: event.pageX, y: event.pageY });
    const px = coords.x, py = coords.y;
    // find the segment of the edge that is being dragged and set up dragging object appropriately

    // calculate the distance (L¹ metric) between line segment (p1, p2) and point (px, py)
    const segmentDistance = (p1, p2) => {
        // Take advantage of the fact that all segments are horizontal or vertical
        const horizontal = (p1.y === p2.y);

        // [a, b]: endpoints of line segment (x for horizontal, y for vertical)
        // c: other coordinate of line segment (y for horizontal, x for vertical)
        // p, q: coordinates of point ((x, y) for horizontal, (y, x) for vertical)
        const { a, b, c, p, q } = horizontal
            ? { a: Math.min(p1.x, p2.x), b: Math.max(p1.x, p2.x), c: p1.y, p: px, q: py }
            : { a: Math.min(p1.y, p2.y), b: Math.max(p1.y, p2.y), c: p1.x, p: py, q: px };

        let d = Math.abs(q - c);
        if (p < a)
            d += a - p;
        else if (p > b)
            d += p - b;

        return { d, horizontal };
    };

    // compute distance from point to each line segment and choose minimum - that's the segment that will
    // be dragged
    let minIndex = null, minDistance = null, minHorizontal = null;
    for (let i = 0; i + 1 < points.length; ++i) {
        const { d, horizontal } = segmentDistance(points[i], points[i + 1]);
        if (minIndex === null || d < minDistance) {
            minIndex = i;
            minDistance = d;
            minHorizontal = horizontal;
        }
    }

    if (minIndex !== null) {
        event.target.setPointerCapture(event.pointerId);
        return {
            segmentIndex: minIndex,
            horizontal: minHorizontal,
            initX: px,
            initY: py,
            currentX: px,
            currentY: py,
        };
    }

    // possible to find no segments (e.g. if there are 0 or 1 points) - then no drag
    return null;
}


const applyDrag = ({
    points, drag
}) => {
    const newPoints = [ ...points ];
    const si = drag.segmentIndex;
    if (drag.horizontal) {
        const delta = drag.currentY - drag.initY;
        newPoints[si] = { x: points[si].x, y: points[si].y + delta };
        newPoints[si + 1] = { x: points[si + 1].x, y: points[si + 1].y + delta };
    } else {
        const delta = drag.currentX - drag.initX;
        newPoints[si] = { x: points[si].x + delta, y: points[si].y };
        newPoints[si + 1] = { x: points[si + 1].x + delta, y: points[si + 1].y };
    }

    return newPoints;
};

export default CircuitEdge;