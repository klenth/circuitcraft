import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

const RotationContext = createContext();

export const useRotation = () => useContext(RotationContext);

export const RotationProvider = ({ children }) => {
    const [rotations, setRotations] = useState({});

    const setRotation = useCallback((id, newRotation) => {
        setRotations((prevRotations) => {
            const rotation = typeof newRotation === 'function' ? newRotation(prevRotations[id] || 0) : newRotation;
            return { ...prevRotations, [id]: rotation };
        });
    }, []);

    useEffect(() => {
        console.log("RotationContext.js rotation", rotations);
    }, [rotations]); // Log whenever rotations change

    return (
        <RotationContext.Provider value={{ rotations, setRotation }}>
            {children}
        </RotationContext.Provider>
    );
};
