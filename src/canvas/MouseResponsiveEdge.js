// based on https://stackoverflow.com/questions/77831116/is-it-possible-to-shape-reactflow-edges-by-dragging-them#78118229

export const MouseResponsiveEdge = ({
    id,
    path,
    style,
    markerEnd,
    markerStart,
    interactionWidth = 20,
    onClick = (() => {}),
    onPointerDown = (() => {}),
    onPointerUp = (() => {}),
    onPointerMove = (() => {}),
}) => {
    return (
        <>
            <path
                id={id}
                style={style}
                d={path}
                fill={'none'}
                className={'react-flow__edge-path'}
                markerEnd={markerEnd}
                markerStart={markerStart}

            />
            {interactionWidth && (
                <path
                    d={path}
                    fill={'none'}
                    strokeWidth={interactionWidth}
                    onClick={e => onClick(e)}
                    onPointerDown={e => onPointerDown(e)}
                    onPointerUp={e  => onPointerUp(e)}
                    onPointerMove={e => onPointerMove(e)}
                />
            )}
        </>
    );
};