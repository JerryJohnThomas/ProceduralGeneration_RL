import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { vec3 } from "@react-three/rapier";
import * as THREE from "three";
import { Actions, MOVEMENT_SPEED, JUMP_FORCE, ROTATION_SPEED } from "../Class/Actions";

import { useFrame } from "@react-three/fiber";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {

    // const agents = useRef([]);
    let AgentsCount = 1;
    const [, forceUpdate] = useState(0); // Used to force re-render

    const InitializeAgent = (id) => ({
        agentId : useRef(id),
        rb: useRef(null),
        isButtonUpPressedRef: useRef(false),
        isButtonDownPressedRef: useRef(false),
        isButtonLeftPressedRef: useRef(false),
        isButtonRightPressedRef: useRef(false),
        isButtonJumpPressedRef: useRef(false),
        timeoutRefs: useRef({
            up: { current: null },
            down: { current: null },
            left: { current: null },
            right: { current: null },
            jump: { current: null },
        }),
    });
    const agents= useRef( [InitializeAgent(0)]);

    const addAgent = () =>{
        // agents.current.push(InitializeAgent(AgentsCount));
        AgentsCount++;
        forceUpdate(n => n + 1);
    }

    const getPosition = (agentIndex) => {
        return agents.current[agentIndex].rb.current.translation();
    };

    const getRotation = (agentIndex) => {
        return agents.current[agentIndex].rb.current.rotation();
    };

    const resetAgent = (agentIndex) => {
        const position = vec3(0, 0, 0);
        agents.current[agentIndex].rb.current.setTranslation(position, true);
    };

    const setButtonPress = (agentIndex, ref, timeoutKey, duration) => {
        ref.current = true;

        if (agents.current[agentIndex].timeoutRefs.current[timeoutKey]) {
            clearTimeout(agents.current[agentIndex].timeoutRefs.current[timeoutKey]);
        }

        agents.current[agentIndex].timeoutRefs.current[timeoutKey] = setTimeout(() => {
            ref.current = false;
            agents.current[agentIndex].timeoutRefs.current[timeoutKey] = null;
        }, duration);
    };

    const moveAgent = (agentIndex, action, duration = 100) => {
        switch (action) {
            case Actions.FORWARD:
                setButtonPress(agentIndex, agents.current[agentIndex].isButtonUpPressedRef, "up", duration);
                break;
            case Actions.BACKWARD:
                setButtonPress(agentIndex, agents.current[agentIndex].isButtonDownPressedRef, "down", duration);
                break;
            case Actions.LEFT:
                setButtonPress(agentIndex, agents.current[agentIndex].isButtonLeftPressedRef, "left", duration);
                break;
            case Actions.RIGHT:
                setButtonPress(agentIndex, agents.current[agentIndex].isButtonRightPressedRef, "right", duration);
                break;
            case Actions.JUMP:
                setButtonPress(agentIndex, agents.current[agentIndex].isButtonJumpPressedRef, "jump", duration);
                break;
            case Actions.NONE:
            default:
                break;
        }
    };


    return (
        <PlayerContext.Provider
            value={{
                agents,
                moveAgent,
                getPosition,
                getRotation,
                resetAgent,
                addAgent
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
