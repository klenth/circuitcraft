import React, { useEffect, useRef, useState } from "react";
import ReactFlow, { BaseEdge, EdgeLabelRenderer, useReactFlow, Position, useNodes, useStore } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";

import { getSmartEdge, svgDrawStraightLinePath, pathfindingJumpPointNoDiagonal } from '@tisoap/react-flow-smart-edge'
import Canvas from "./Canvas";

//This component receives props
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

  //store svg path data
  const [path, setPath] = useState('');

  const [edgePosition, setEdgePosition] = useState({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const { getZoom } = useReactFlow();
  const zoom = getZoom();
  //This hook returns an array of the current nodes
  const nodes = useNodes();
  const edgeRef = useRef(null);


  //!! need updateEdgePath to get the new dimensions of nodes to be passed for handle connection !!

  //Calculates the connection points for handles and edges so it is better
  //Change offsetX and offsetY for adjusting the edge connection point better
  function getHandleConnectionPoint(sourceX, sourceY, targetX, targetY, offsetX = 6, offsetY = 1.6) {
    return {
      sourceX: sourceX + offsetX,
      sourceY: sourceY + offsetY,
      targetX: targetX - offsetX,
      targetY: targetY + offsetY,
    };
  }
  
  //Updates the path state with the new source and target x&y
  const updateEdgePath = (newSourceX, newSourceY, newTargetX, newTargetY, nodes) => {
    const newPath = calculateEdgePath(newSourceX, newSourceY, newTargetX, newTargetY, nodes);
    setPath(newPath);
  };

  //Main custom calculations for path finding
  const calculateEdgePath = (sourceX, sourceY, targetX, targetY, nodes) => {
    const { sourceX: newSourceX, sourceY: newSourceY, targetX: newTargetX, targetY: newTargetY } = 
      getHandleConnectionPoint(sourceX, sourceY, targetX, targetY);

    //Calculate Midpoint: Compute the horizontal midpoint (midX) between the source and target points.
    const midX = (newSourceX + newTargetX) / 2;

    // Initial Path: Create a path with a vertical segment connecting the midpoints:

    //Integrating smart edge react flow
    const { svgPathString, error } = getSmartEdge({
      sourcePosition,
      targetPosition,
      sourceX: newSourceX,
      sourceY: newSourceY,
      targetX: newTargetX,
      targetY: newTargetY,
      nodes: nodes,
      options: { nodePadding: 20, drawEdge: customDrawEdge, generatePath: pathfindingJumpPointNoDiagonal, gridRatio: 1 }
    });

    // If there is an error, fall back to a straight line path
    if (error) {
      return `M${newSourceX},${newSourceY} L${newTargetX},${newTargetY}`;
    }

    return svgPathString;
  };

  // Custom drawEdge function to ensure horizontal and vertical lines
  const customDrawEdge = (source, target, path) => {
    let svgPathString = `M ${source.x}, ${source.y} `;

    path.forEach((point) => {
      const [x, y] = point;
      svgPathString += `L ${x}, ${y} `;
    });

    svgPathString += `L ${target.x}, ${target.y} `;
    return svgPathString;
  };

  //useEffect ensures the edge path is updated whenever the source or target coordinates or nodes change.
  useEffect(() => {
    updateEdgePath(sourceX, sourceY, targetX, targetY, nodes);
  }, [sourceX, sourceY, targetX, targetY, nodes]);


  return (
    <>
      <BaseEdge path={path} markerEnd={markerEnd} style={{ ...style, strokeWidth: 3, stroke: 'black' }} />
      
      <EdgeLabelRenderer>
        <div
          ref={edgeRef}
          style={{
            position: "absolute",
            left: `${sourceX}px`,
            top: `${sourceY}px`,
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
