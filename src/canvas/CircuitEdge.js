import React, { useEffect, useRef, useState } from "react";
import { BaseEdge, EdgeLabelRenderer, useReactFlow, useStore, useNodes } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";

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
    const nodes = useNodes();

    
    useEffect(() => {

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

            const { svgPathString, error } = routeEdge({
                sourcePosition, targetPosition,
                sourceX: newSourceX, sourceY: newSourceY,
                targetX: newTargetX, targetY: newTargetY
            });

            if (error) {
                setPath(`M${newSourceX},${newSourceY} L${newTargetX},${newTargetY}`);
            } else {
                setPath(svgPathString);
            }
        };

        updateEdgePath();
    }, [sourceX, sourceY, targetX, targetY, nodes, sourcePosition, targetPosition]);

    return (
        <>
            <BaseEdge path={path} markerEnd={markerEnd} style={{ ...style, strokeWidth: 3 }} />
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

    let pathString = `M${sourceX},${sourceY}`;
    for (const point of points)
        pathString += `L${point.x},${point.y}`;
    pathString += `L${targetX},${targetY}`;

    return { svgPathString: pathString, error: null };
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