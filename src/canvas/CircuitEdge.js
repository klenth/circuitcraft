import React, { useEffect, useRef, useState } from "react";
import { BaseEdge, EdgeLabelRenderer, useReactFlow, useStore, useNodes } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import { MouseResponsiveEdge } from './MouseResponsiveEdge';
import { screenToFlowPosition } from 'reactflow';

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
                       }) => {

    const [path, setPath] = useState('');
    const [points, setPoints] = useState(null);
    const [drag, setDrag] = useState(null);
    const nodes = useNodes();
    const flow = useReactFlow();
    

    function getHandleConnectionPoint(sourceX, sourceY, targetX, targetY, offsetX = 6, offsetY = 1.6) {
        return {
            sourceX: sourceX + offsetX,
            sourceY: sourceY + offsetY,
            targetX: targetX - offsetX,
            targetY: targetY + offsetY,
        };
    }
  
    const updateEdgePath = () => {
        
        const { sourceX: newSourceX, sourceY: newSourceY, targetX: newTargetX, targetY: newTargetY } = 
        getHandleConnectionPoint(sourceX, sourceY, targetX, targetY);

        const { svgPathString, error, points } = routeEdge({
            sourcePosition, targetPosition,
            sourceX: newSourceX, sourceY: newSourceY,
            targetX: newTargetX, targetY: newTargetY
        });

        if (error) {
            setPath(`M${newSourceX},${newSourceY} L${newTargetX},${newTargetY}`);
            setPoints([]);
        } else {
            setPath(svgPathString);
            setPoints(points);
        }
    };

    useEffect(
        updateEdgePath,
        [sourceX, sourceY, targetX, targetY, nodes, sourcePosition, targetPosition]
    );

    let renderedPath = path;

    if (drag) {
        const draggedPoints = applyDrag({ points, drag });

        const { sourceX: newSourceX, sourceY: newSourceY, targetX: newTargetX, targetY: newTargetY } = 
        getHandleConnectionPoint(sourceX, sourceY, targetX, targetY);

        renderedPath = renderPath({
            sourceX: newSourceX, sourceY: newSourceY,
            points: draggedPoints,
            targetX: newTargetX, targetY: newTargetY
        });

        console.log('Coordinates:', { sourceX, newSourceX, sourceY, newSourceY, targetX, newTargetX, targetY, newTargetY });

        // console.debug(renderedPath);
    }

    return (
        <>
            <MouseResponsiveEdge
                path={renderedPath}
                markerEnd={markerEnd}
                style={{ ...style, strokeWidth: 3 }} //stroke: 'black'
                onPointerDown={event => setDrag(newDrag({ event, points, flow }))}
                onPointerMove={event => {
                    if (drag) {
                        const coords = flow.screenToFlowPosition({ x: event.pageX, y: event.pageY });
                        setDrag({ ...drag, currentX: coords.x, currentY: coords.y });
                    }
                }}
                onPointerUp={() => {
                    if (drag) {
                        const draggedPoints = applyDrag({ points, drag });
                        const { sourceX: newSourceX, sourceY: newSourceY, targetX: newTargetX, targetY: newTargetY } = 
                        getHandleConnectionPoint(sourceX, sourceY, targetX, targetY);
                        setPoints(applyDrag({ points, drag }));
                        setPath(renderPath({
                            sourceX: newSourceX, sourceY: newSourceY,
                            points: draggedPoints,
                            targetX: newTargetX, targetY: newTargetY
                        }));
                        setDrag(null);
                    }
                }}
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
    //const { sourceX, sourceY, targetX, targetY } = getHandleConnectionPoint(sourceX, sourceY, targetX, targetY);
    // const { sourceX: newSourceX, sourceY: newSourceY, targetX: newTargetX, targetY: newTargetY } = 
    // getHandleConnectionPoint(sourceX, sourceY, targetX, targetY);

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

    flat() {
        return { x: this.x, y: this.y };
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