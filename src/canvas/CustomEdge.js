/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from "react";
import { BaseEdge, EdgeLabelRenderer, useReactFlow, useStore, useNodes } from "reactflow";
// import { drag } from "d3-drag";
// import { select } from "d3-selection";
import { getSmartEdge, svgDrawStraightLinePath, pathfindingJumpPointNoDiagonal } from '@tisoap/react-flow-smart-edge'


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

  const edgeRef = useRef(null);
  //This hook returns an array of the current nodes
  const nodes = useNodes();

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
  const updateEdgePath = (newSourceX, newSourceY, newTargetX, newTargetY) => {
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



    // const { svgPathString } = getSmartEdge({
    //   sourcePosition,
    //   targetPosition,
    //   sourceX: newSourceX,
    //   sourceY: newSourceY,
    //   targetX: newTargetX,
    //   targetY: newTargetY,
    //   nodes: nodes,
    //   options: {nodePadding: 20, drawEdge: svgDrawStraightLinePath, generatePath: pathfindingJumpPointNoDiagonal }
    // });

    //add a const with draw edge code and feed that up


    //Initial path is calculated using getSmartEdge function
    //let path = svgPathString;


    // path = `M${newSourceX},${newSourceY} L${midX},${newSourceY} L${midX},${newTargetY} L${newTargetX},${newTargetY}`;
      // M${newSourceX},${newSourceY}: Move to the source point.
      // L${midX},${newSourceY}: Draw a line to the midpoint horizontally.
      // L${midX},${newTargetY}: Draw a vertical line to the target's y-coordinate.
      // L${newTargetX},${newTargetY}: Draw a line to the target point.

    // Collision Detection and Adjustment: Iterate through all nodes to check if the vertical segment intersects any node's bounding box:
    // if (nodes && nodes.length > 0) {
    //   nodes.forEach(node => {
    //     console.log(node);
    //     const { position, width, height } = node;
    //     const nodeLeft = position.x;
    //     const nodeRight = position.x + width;
    //     const nodeTop = position.y;
    //     const nodeBottom = position.y + height;

    //     // If there's an intersection, adjust the path to avoid the node by creating an additional segment.
    //     // Offset: An offset of 20 pixels is used to avoid collision.
    //     if (midX > nodeLeft && midX < nodeRight) {
    //       console.log(midX, nodeLeft, nodeRight);
    //       if ((newSourceY < nodeTop && newTargetY > nodeBottom) || (newSourceY > nodeBottom && newTargetY < nodeTop)) {
    //         const offset = 20;
    //         if (newSourceY < newTargetY) {
    //           path = `M${newSourceX},${newSourceY} L${midX},${newSourceY} L${midX},${nodeTop - offset} L${newTargetX},${nodeTop - offset} L${newTargetX},${newTargetY}`;
    //         } else {
    //           path = `M${newSourceX},${newSourceY} L${midX},${newSourceY} L${midX},${nodeBottom + offset} L${newTargetX},${nodeBottom + offset} L${newTargetX},${newTargetY}`;
    //         }
    //       }
    //     }
    //   });
    // }

    //return path;


  //useEffect ensures the edge path is updated whenever the source or target coordinates or nodes change.
  useEffect(() => {
    updateEdgePath(sourceX, sourceY, targetX, targetY);
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
