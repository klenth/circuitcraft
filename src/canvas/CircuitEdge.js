import React, { useEffect, useRef, useState } from "react";
import { EdgeLabelRenderer, useReactFlow, useNodes } from "reactflow";
import { MouseResponsiveEdge } from './MouseResponsiveEdge';
import { useRotation } from './RotationContext';


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
    //const nodes = useNodes(); // not needed?
    const flow = useReactFlow();
    
    // Access the rotations context
    const { rotations } = useRotation();
    // Access the nodes and type information
    const sourceNode = nodes.find(node => node.id === source);
    const sourceGateType = sourceNode?.type;

    const rotationAdjustments = {
        270: { source: { x: -5.5, y: 0 }, target: { x: -5.5, y: 13 } },
        180: { source: { x: -5.5, y: 1.2 }, target: { x: 5.5, y: 1.2 } },
        90: { source: { x: -5.5, y: 13 }, target: { x: -5.7, y: 1 } },
        0: { source: { x: 6, y: 1.6 }, target: { x: -6, y: 1.6 } },
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
            sourceAdjustment.source.x = 0;
            sourceAdjustment.source.y = 3;
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
                onDragStart={e => console.debug(`onDragStart`, e)}
                onDrag={e => console.debug('onDrag', e)}
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

const routeEdge = ({
    sourceX, sourceY,
    targetX, targetY,
    sourcePosition, targetPosition
}) => {
    const sourceP = new Point(sourceX, sourceY);
    const targetP = new Point(targetX, targetY);
    const sourceNormal = PlusI; //positionVector(sourcePosition);
    const targetNormal = MinusI; //positionVector(targetPosition);
    const displacement = sourceP.displacement(targetP);
    const behind = displacement.dot(sourceNormal) >= 0;
    const parallel = sourceNormal.dot(targetNormal) !== 0.0;

    const points = [ sourceP ];
    const numInternalSegments = 2 + (parallel ? 1 : 0);

    let horizontal = behind ?
        sourceNormal.dot(PlusI) !== 0 :
        sourceNormal.dot(PlusJ) !== 0
    ;

    const numHorizontalSegments = Math.floor((numInternalSegments + (horizontal ? 1 : 0)) / 2);
    const numVerticalSegments = numInternalSegments - numHorizontalSegments;

    let lastPoint = sourceP;
    for (let i = 0; i < numInternalSegments; ++i, horizontal = !horizontal) {
        let nextPoint;
        if (horizontal)
            nextPoint = lastPoint.displaced(PlusI.times(displacement.x / numHorizontalSegments));
        else
            nextPoint = lastPoint.displaced(PlusJ.times(displacement.y / numVerticalSegments));

        points.push(nextPoint);
        lastPoint = nextPoint;
    }

    const pathString = renderPath({
        sourceX, sourceY,
        points,
        targetX, targetY
    });

    return { svgPathString: pathString, error: null, points: points, };
};

const renderPath = ({ sourceX, sourceY, points, targetX, targetY }) => {
    let pathString = `M${sourceX},${sourceY}`;
    for (const point of points)
        pathString += `L${point.x},${point.y}`;
    pathString += `L${targetX},${targetY}`;

    return pathString;
};

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

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    displacement(p) {
        return new Vector(p.x - this.x, p.y - this.y);
    }

    displaced(v) {
        return new Point(this.x + v.x, this.y + v.y);
    }
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    times(f) {
        return new Vector(f * this.x, f * this.y);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
}

function positionVector(position) {
    const map = { top: PlusJ, bottom: MinusJ, left: MinusI, right: PlusI };
    if (map[position])
        return map[position];
    else {
        console.debug(`Unknown position: ${position}`);
        return PlusI; // default to rightward
    }
}

// Standard basis vectors: +/-i (right/left), +/-j (up/down)
const PlusI = new Vector(1, 0),
      MinusI = new Vector(-1, 0),
      PlusJ = new Vector(0, 1),
      MinusJ = new Vector(0, -1);

export default CircuitEdge;