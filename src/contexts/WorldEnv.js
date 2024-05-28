import { createContext, useContext, useState } from "react";
import Platform from "../Class/Platform";
import { useRef } from "react";

const WorldEnvContext = createContext({});

const initialPlatforms = [new Platform(1, [0, -2, 0], "#ff0000", [5, 0.5, 100]),
 new Platform(2, [3, 0, 1], "#00ff00"),
 new Platform(3, [0.1, -2.2, 0.2], "#094074", [100,5,5])
];

export const WorldEnvProvider = (props) => {
    const [startingPosition, setStartingPosition] = useState([0, 0, 0]); // This is not used
    const [target, setTarget] = useState(new Platform(0, [-1, 3.2, 1], "")); // Default target position
    const [platforms, setPlatforms] = useState(initialPlatforms); // List of platforms
    let idCounter = useRef(1 + initialPlatforms.length);

    const addPlatform = (position, color = "#7f00ff") => {
        const newPlatform = new Platform(idCounter.current, position, color);
        setPlatforms((prevPlatforms) => [...prevPlatforms, newPlatform]);
        idCounter.current += 1;
    };

    return (
        <WorldEnvContext.Provider
            value={{
                startingPosition,
                target,
                platforms,
                setStartingPosition,
                setTarget,
                setPlatforms,
                addPlatform,
            }}
        >
            {props.children}
        </WorldEnvContext.Provider>
    );
};

export const useWorldEnv = () => {
    return useContext(WorldEnvContext);
};
