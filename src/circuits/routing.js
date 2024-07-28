import { Position } from 'reactflow';

export const routeEdge = ({
                       sourceX, sourceY,
                       targetX, targetY,
                       sourcePosition, targetPosition
                   }) => {
    const sourceP = new Point(sourceX, sourceY);
    const targetP = new Point(targetX, targetY);
    const sourceNormal = positionVector(sourcePosition);
    const targetNormal = positionVector(targetPosition);
    const displacement = sourceP.displacement(targetP);
    const behind = displacement.dot(sourceNormal) <= 0;
    const parallel = sourceNormal.dot(targetNormal) !== 0.0;

    const points = [ sourceP ];
    const numInternalSegments = 2 + (parallel ? 1 : 0);

    let horizontal = sourceNormal.dot(PlusI) !== 0; /*behind ?
        sourceNormal.dot(PlusI) !== 0 :
        sourceNormal.dot(PlusJ) !== 0

    ;*/
    if (behind)
        horizontal = !horizontal;
    else
        points.push(sourceP);

    console.debug(`displacement = (${displacement.x},${displacement.y}), sourceNormal = [${sourceNormal.x}, ${sourceNormal.y}]`);
    console.debug(`behind = ${behind}, horizontal = ${horizontal}`);

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

    points.push(lastPoint);

    const pathString = renderPath({
        sourceX, sourceY,
        points,
        targetX, targetY
    });

    return { svgPathString: pathString, error: null, points: points, };
};

export const renderPath = ({ sourceX, sourceY, points, targetX, targetY }) => {
    let pathString = `M${sourceX},${sourceY}`;
    for (const point of points)
        pathString += `L${point.x},${point.y}`;
    pathString += `L${targetX},${targetY}`;

    return pathString;
};

export class Point {
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

export class Vector {
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

export function positionVector(position) {
    const map = {};
    map[Position.Top] = MinusJ;
    map[Position.Right] = PlusI;
    map[Position.Bottom] = PlusJ;
    map[Position.Left] = MinusI;
    // const map = { Position.Top: PlusJ, bottom: MinusJ, left: MinusI, right: PlusI };
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
