import React, { useEffect, useRef, useState } from "react";
import { BaseEdge, EdgeLabelRenderer, useReactFlow, useStore } from "reactflow";
import { drag } from "d3-drag";
import { select } from "d3-selection";
//use this and its options as props
import { getSmartEdge } from '@tisoap/react-flow-smart-edge'


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

  

  //State and References
  const [labelPointX, setLabelPointX] = useState(0);
  const [labelPointY, setLabelPointY] = useState(0);
  //store svg path data
  const [path, setPath] = useState('');

  const { getZoom } = useReactFlow();
  const zoom = getZoom();
  const edgeRef = useRef(null);
  //Hook to get the list of nodes from the React Flow store
  const nodes = useStore((state) => state.nodes);

  //Need to be able to use this for custom edge and utilize the node padding
  // && they also have a generatePath where we can customize the path finding and bring in drag and stuff
  const getSmartEdgeResponse = getSmartEdge({
    sourcePosition,
    targetPosition,
    sourceX,
    sourceY,
    targetX,
    targetY,
    nodes,
    options: {nodePadding: 20}
  })

  //drag effect - NEEDS FIX
  useEffect(() => {
    if (edgeRef.current) {
      const d3Selection = select(edgeRef.current);
      d3Selection.call(
        drag().on("drag", (e) => {
          setLabelPointX((prev) => {
            const newValue = prev + e.dx / zoom;
            updateEdgePath(sourceX + newValue, sourceY + labelPointY, targetX, targetY);
            return newValue;
          });
          setLabelPointY((prev) => {
            const newValue = prev + e.dy / zoom;
            updateEdgePath(sourceX + labelPointX, sourceY + newValue, targetX, targetY);
            return newValue;
          });
        })
      );
    }
  }, [zoom, labelPointX, labelPointY, sourceX, sourceY, targetX, targetY]);

  //Calculates the connection points for handles and edges so it is better
  function getHandleConnectionPoint(sourceX, sourceY, targetX, targetY, offsetX = 4, offsetY = 1.6) {
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
    let path = `M${newSourceX},${newSourceY} L${midX},${newSourceY} L${midX},${newTargetY} L${newTargetX},${newTargetY}`;
      // M${newSourceX},${newSourceY}: Move to the source point.
      // L${midX},${newSourceY}: Draw a line to the midpoint horizontally.
      // L${midX},${newTargetY}: Draw a vertical line to the target's y-coordinate.
      // L${newTargetX},${newTargetY}: Draw a line to the target point.

    // Collision Detection and Adjustment: Iterate through all nodes to check if the vertical segment intersects any node's bounding box:
    if (nodes && nodes.length > 0) {
      nodes.forEach(node => {
        const { position, width, height } = node;
        const nodeLeft = position.x;
        const nodeRight = position.x + width;
        const nodeTop = position.y;
        const nodeBottom = position.y + height;

        // If there's an intersection, adjust the path to avoid the node by creating an additional segment.
        // Offset: An offset of 20 pixels is used to avoid collision.
        if (midX > nodeLeft && midX < nodeRight) {
          if ((newSourceY < nodeTop && newTargetY > nodeBottom) || (newSourceY > nodeBottom && newTargetY < nodeTop)) {
            const offset = 20;
            if (newSourceY < newTargetY) {
              path = `M${newSourceX},${newSourceY} L${midX},${newSourceY} L${midX},${nodeTop - offset} L${newTargetX},${nodeTop - offset} L${newTargetX},${newTargetY}`;
            } else {
              path = `M${newSourceX},${newSourceY} L${midX},${newSourceY} L${midX},${nodeBottom + offset} L${newTargetX},${nodeBottom + offset} L${newTargetX},${newTargetY}`;
            }
          }
        }
      });
    }

    return path;
  };

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
            left: `${sourceX + labelPointX}px`,
            top: `${sourceY + labelPointY}px`,
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




//Sandbox code

// import { useEffect, useRef, useState } from "react";
// import { BaseEdge, EdgeLabelRenderer, useReactFlow } from "reactflow";

// import { drag } from "d3-drag";
// import { select } from "d3-selection";

// //copied from reactflow lib - probably you can import this util directly from
// function getEdgeCenter({ sourceX, sourceY, targetX, targetY }) {
//   const xOffset = Math.abs(targetX - sourceX) / 2;
//   const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

//   const yOffset = Math.abs(targetY - sourceY) / 2;
//   const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

//   return { centerX, centerY, xOffset, yOffset };
// }

// // just to store some data outside the function so we can avoid re-rendering
// let storeYVal = {};
// let storeXValBottom = {};
// let storeXValTop = {};

// let extraPoints = {};

// export default CustomEdge = ({
//   id,
//   sourceX,
//   sourceY,
//   targetX,
//   targetY,
//   sourcePosition,
//   targetPosition,
//   markerEnd,
//   style = {},
//   ...rest
// }) => {
//   const { centerX, centerY, xOffset, yOffset } = getEdgeCenter({
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//   });
//   const [labelPointY, setLabelPointY] = useState(storeYVal?.[id] || 0);
//   const [labelPointX, setLabelPointX] = useState(storeXValBottom[id] || 0);
//   const [labelPointXTop, setLabelPointXTop] = useState(storeXValTop[id] || 0);
//   const [extraPointsPosState, setExtraPointsPosState] = useState({});
//   let zoom = 0;

//   const { getZoom, getEdges, setEdges } = useReactFlow();
//   const edges = getEdges();
//   let isSelected = true; //edges.find((edge) => edge.id === id && edge.selected);

//   zoom = getZoom();

//   const edgeRef = useRef(null);
//   const edgeRefBottom = useRef(null);
//   const edgeRefTop = useRef(null);
//   useEffect(() => {
//     if (edgeRef.current) {
//       const d3Selection = select(edgeRef.current);
//       d3Selection.call(
//         drag().on("drag", (e) => {
//           setEdges((prev) => {
//             return prev.map((edge) =>
//               edge.id === id
//                 ? { ...edge, selected: true }
//                 : { ...edge, selected: false }
//             );
//           });
//           setLabelPointY((prev) => prev - e.dy / zoom);
//           // Storing previous change in a simple way to not reset on re-render.
//           // you can improve it by having context.
//           // or you can try to use useStore hook.
//           storeYVal[id] = (storeYVal[id] || 0) - e.dy / zoom;
//         })
//       );
//     }
//     if (edgeRefBottom.current) {
//       const d3Selection = select(edgeRefBottom.current);

//       d3Selection.call(
//         drag().on("drag", (e) => {
//           setEdges((prev) => {
//             return prev.map((edge) =>
//               edge.id === id
//                 ? { ...edge, selected: true }
//                 : { ...edge, selected: false }
//             );
//           });
//           setLabelPointX((prev) => prev + e.dx / zoom);
//           // Storing previous change in a simple way to not reset on re-render.
//           // you can improve it by having context.
//           // or you can try to use useStore hook.
//           storeXValBottom[id] = (storeXValBottom[id] || 0) + e.dx / zoom;
//         })
//       );
//     }
//     if (edgeRefTop.current) {
//       const d3Selection = select(edgeRefTop.current);

//       d3Selection.call(
//         drag().on("drag", (e) => {
//           setEdges((prev) => {
//             return prev.map((edge) =>
//               edge.id === id
//                 ? { ...edge, selected: true }
//                 : { ...edge, selected: false }
//             );
//           });
//           setLabelPointXTop((prev) => prev + e.dx / zoom);
//           storeXValTop[id] = (storeXValTop[id] || 0) + e.dx / zoom;
//         })
//       );
//     }
//   }, []);
//   let isFirstExtraPoint = {};
//   useEffect(() => {
//     if (labelPointX !== 0 || labelPointXTop !== 0) {
//       Object.keys(extraPoints).forEach((XtraPoint, index) => {
//         if (!isFirstExtraPoint[XtraPoint]) {
//           const d3Selection = select(document.getElementById(XtraPoint));

//           d3Selection.call(
//             drag().on("drag", (e) => {
//               setEdges((prev) => {
//                 return prev.map((edge) =>
//                   edge.id === id
//                     ? { ...edge, selected: true }
//                     : { ...edge, selected: false }
//                 );
//               });
//               setExtraPointsPosState((prev) => ({
//                 ...prev,
//                 XtraPoint: {
//                   ...prev?.XtraPoint,
//                   y: (prev?.XtraPoint?.y || 0) + e.dy / zoom,
//                 },
//               }));

//               extraPoints[XtraPoint] = {
//                 ...extraPoints?.[XtraPoint],
//                 y: (extraPoints?.[XtraPoint]?.y || 0) + e.dy / zoom,
//               };
//             })
//           );
//         } else {
//           isFirstExtraPoint[XtraPoint] = true;
//         }
//       });
//     }
//   }, [labelPointX, labelPointXTop]);

//   function generateOrthogonalEdgePath(
//     startX,
//     startY,
//     endX,
//     endY,
//     padding,
//     Hoffset = 0,
//     Voffset = 0,
//     VToffset = 0
//   ) {
//     // Calculate horizontal and vertical distances
//     var dx = endX - startX;
//     var dy = endY - startY;

//     // Calculate the position for the horizontal line
//     var horizontalY = startY + dy / 2 - Hoffset;

//     // Calculate the position for the vertical line
//     var verticalX = endX - padding + Voffset;
//     var verticalXT = startX - padding + VToffset;
//     // Create a path string
//     var path =
//       "M" +
//       verticalXT +
//       "," +
//       (startY + (extraPoints?.[`topCenter-${id}`]?.y || 0)) +
//       " ";

//     // Horizontal then vertical
//     path += "V" + horizontalY + " ";
//     path += "H" + verticalXT + " ";
//     path += "H" + verticalX + " ";
//     path += "V" + (endY + (extraPoints?.[`bottomCenter-${id}`]?.y || 0)) + "";

//     if (VToffset !== 0) {
//       extraPoints[`topCenter-${id}`] = {
//         ...extraPoints?.[`topCenter-${id}`],
//         pos: {
//           left: `${(sourceX + verticalXT) / 2}px`,
//           top: `${startY + (extraPoints?.[`topCenter-${id}`]?.y || 0)}px`,
//           transform: isSelected ? "translateY(-5px)" : "translateY(-2.5px)",
//         },
//       };

//       path += "M" + startX + "," + startY + " ";
//       path += "V" + (startY + (extraPoints?.[`topCenter-${id}`]?.y || 0)) + " ";
//       path += "H" + verticalXT;
//     }
//     if (Voffset !== 0) {
//       extraPoints[`bottomCenter-${id}`] = {
//         ...extraPoints?.[`bottomCenter-${id}`],
//         pos: {
//           left: `${(targetX + verticalX) / 2}px`,
//           top: `${endY + (extraPoints?.[`bottomCenter-${id}`]?.y || 0)}px`,
//           transform: isSelected ? "translateY(-5px)" : "translateY(-2.5px)",
//         },
//       };

//       path += "M" + endX + "," + endY + " ";
//       ``;
//       path +=
//         "V" + (endY + (extraPoints?.[`bottomCenter-${id}`]?.y || 0)) + " ";
//       path += "H" + verticalX + " ";
//     }

//     return path;
//   }
//   // generating the path
//   var path = generateOrthogonalEdgePath(
//     sourceX,
//     sourceY,
//     targetX,
//     targetY,
//     0,
//     labelPointY,
//     labelPointX,
//     labelPointXTop
//   );

//   const getTopBottomPointsY = (top) => {
//     if (targetY < sourceY) {
//       if (top) {
//         return (
//           centerY -
//           labelPointY +
//           (yOffset + labelPointY + (extraPoints?.[`topCenter-${id}`]?.y || 0)) /
//             2
//         );
//       } else {
//         return (
//           centerY -
//           labelPointY -
//           (yOffset -
//             labelPointY -
//             (extraPoints?.[`bottomCenter-${id}`]?.y || 0)) /
//             2
//         );
//       }
//     } else {
//       if (top) {
//         return (
//           centerY -
//           labelPointY -
//           (yOffset - labelPointY - (extraPoints?.[`topCenter-${id}`]?.y || 0)) /
//             2
//         );
//       } else {
//         return (
//           centerY -
//           labelPointY +
//           (yOffset +
//             labelPointY +
//             (extraPoints?.[`bottomCenter-${id}`]?.y || 0)) /
//             2
//         );
//       }
//     }
//   };

//   return (
//     <>
//       <BaseEdge key={id} path={[path]} style={style} />
//       <EdgeLabelRenderer>
//         <div
//           ref={edgeRef}
//           className="custom_point"
//           style={{
//             position: "absolute",
//             left: `${centerX + (labelPointX + labelPointXTop) / 2}px`,
//             top: `${centerY - labelPointY}px`,
//             transform: isSelected ? "translateY(-5px)" : "translateY(-3.5px)",
//             opacity: isSelected ? 1 : 0.3,
//             width: isSelected ? "10px" : "5px",
//             height: isSelected ? "10px" : "5px",
//             pointerEvents: "all",
//             borderRadius: "50%",
//             background: "black",
//             cursor: "row-resize",
//           }}
//         />

//         <div
//           ref={edgeRefBottom}
//           className="custom_point"
//           style={{
//             position: "absolute",
//             left: `${targetX + labelPointX}px`,
//             top: `${getTopBottomPointsY(false)}px`,
//             transform: isSelected ? "translateX(-5px)" : "translateX(-2.5px)",
//             opacity: isSelected ? 1 : 0.3,
//             width: isSelected ? "10px" : "5px",
//             height: isSelected ? "10px" : "5px",
//             pointerEvents: "all",
//             borderRadius: "50%",
//             background: "black",
//             cursor: "col-resize",
//           }}
//         />
//         <div
//           ref={edgeRefTop}
//           className="custom_point"
//           style={{
//             position: "absolute",
//             left: `${sourceX + labelPointXTop}px`,
//             top: `${getTopBottomPointsY(true)}px`,
//             transform: isSelected ? "translateX(-5px)" : "translateX(-2.5px)",
//             opacity: isSelected ? 1 : 0.3,
//             width: isSelected ? "10px" : "5px",
//             height: isSelected ? "10px" : "5px",
//             pointerEvents: "all",
//             borderRadius: "50%",
//             background: "black",
//             cursor: "col-resize",
//           }}
//         />
//         {Object.keys(extraPoints).length > 0 &&
//           Object.keys(extraPoints).map((pointKey, index) => {
//             if (
//               pointKey === `bottomCenter-${id}` ||
//               pointKey === `topCenter-${id}`
//             ) {
//               return (
//                 <div
//                   id={pointKey}
//                   key={index}
//                   className="custom_point"
//                   style={{
//                     position: "absolute",
//                     left: extraPoints[pointKey]?.pos?.left,
//                     top: extraPoints[pointKey]?.pos?.top,
//                     transform: extraPoints[pointKey]?.pos?.transform,
//                     opacity: isSelected ? 1 : 0.3,
//                     width: isSelected ? "10px" : "5px",
//                     height: isSelected ? "10px" : "5px",
//                     pointerEvents: "all",
//                     borderRadius: "50%",
//                     background: "black",
//                     cursor: "row-resize",
//                   }}
//                 />
//               );
//             }
//           })}
//       </EdgeLabelRenderer>
//     </>
//   );
// };
