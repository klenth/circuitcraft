import React, { useEffect, useRef, useState } from "react";
import ReactFlow, { BaseEdge, EdgeLabelRenderer, useReactFlow, Position, getSmoothStepPath, useStore } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";

const CustomStepEdge = ({
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
  const [edgePosition, setEdgePosition] = useState({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const { getZoom } = useReactFlow();
  const zoom = getZoom();
  const nodes = useStore((state) => state.nodes);
  const edgeRef = useRef(null);

  //this is supposed to allow for edges to be moved
  const handleDrag = (event) => {
    const { dx, dy } = event;
    setEdgePosition((prev) => ({
      sourceX: prev.sourceX + dx / zoom,
      sourceY: prev.sourceY + dy / zoom,
      targetX: prev.targetX + dx / zoom,
      targetY: prev.targetY + dy / zoom,
    }));
  };

  useEffect(() => {
    if (edgeRef.current) {
      const d3Selection = select(edgeRef.current);
      d3Selection.call(drag().on("drag", handleDrag));
    }
  }, [zoom]);

  useEffect(() => {
    setEdgePosition({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  }, [sourceX, sourceY, targetX, targetY]);

  const calculateEdgePath = (sourceX, sourceY, targetX, targetY, nodes) => {
    const midX = (sourceX + targetX) / 2;
    //const midY = (sourceY + targetY) / 2;
    let path = `M${sourceX},${sourceY} L${midX},${sourceY} L${midX},${targetY} L${targetX},${targetY}`;

    //this is where the error comes, nodes is undefined----------------------------------------------------------------------------------
    if (nodes && nodes.length > 0) {
      nodes.forEach(node => {
        const {position, width, height} = node;
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

  const path = calculateEdgePath(
      edgePosition.sourceX,
      edgePosition.sourceY,
      edgePosition.targetX,
      edgePosition.targetY,
      nodes
  );

  return (
    <>
      <BaseEdge path={path} markerEnd={markerEnd} style={{ ...style, strokeWidth: 4 }} />
      <EdgeLabelRenderer>
        <div
          ref={edgeRef}
          style={{
            position: "absolute",
            left: `${edgePosition.sourceX}px`,
            top: `${edgePosition.sourceY}px`,
            width: "10px",
            height: "10px",
            cursor: "move",
          }}
        />
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomStepEdge;