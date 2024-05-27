import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { vec3 } from "@react-three/rapier";
import * as THREE from "three";
import { Actions, MOVEMENT_SPEED, JUMP_FORCE, ROTATION_SPEED } from "../Class/Actions";
import { useFrame } from "@react-three/fiber";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    let AgentsCount = useRef(3);

    const InitializeAgent = (id, startingPos = { x: 0, y: 2, z: 0 }) => ({
        agentId: useRef(id),
        rb: useRef(null),
        groupRef: useRef(null),
        isButtonUpPressedRef: useRef(false),
        isButtonDownPressedRef: useRef(false),
        isButtonLeftPressedRef: useRef(false),
        isButtonRightPressedRef: useRef(false),
        isButtonJumpPressedRef: useRef(false),
        startingPos: startingPos,
        timeoutRefs: useRef({
            up: { current: null },
            down: { current: null },
            left: { current: null },
            right: { current: null },
            jump: { current: null },
        }),
    });

    // Helper function to initialize agents
    const initializeAllAgents = (numAgents) => {
        const agents = [];
        for (let i = 0; i < numAgents; i++) {
            const position = { x: i * 2 - numAgents, y: 3, z: 0 }; // Adjust position logic as needed
            agents.push(InitializeAgent(i, position));
        }
        return agents;
    };

    const [agents, setAgents] = useState(() => initializeAllAgents(AgentsCount.current));

    const getPosition = (agentIndex) => {
        return agents[agentIndex].rb?.translation();
    };

    const getRotation = (agentIndex) => {
        return agents[agentIndex].rb?.rotation();
    };

    const resetAgent = (agentIndex) => {
        const position = vec3(0, 0, 0);
        agents[agentIndex].rb?.setTranslation(position, true);
    };

    const setButtonPress = (agentIndex, ref, timeoutKey, duration) => {
        ref.current = true;

        if (agents[agentIndex].timeoutRefs[timeoutKey]) {
            clearTimeout(agents[agentIndex].timeoutRefs[timeoutKey]);
        }

        agents[agentIndex].timeoutRefs[timeoutKey] = setTimeout(() => {
            ref.current = false;
            agents[agentIndex].timeoutRefs[timeoutKey] = null;
        }, duration);
    };

    const moveAgent = (agentIndex, action, duration = 100) => {
        switch (action) {
            case Actions.FORWARD:
                setButtonPress(agentIndex, agents[agentIndex].isButtonUpPressedRef, "up", duration);
                break;
            case Actions.BACKWARD:
                setButtonPress(agentIndex, agents[agentIndex].isButtonDownPressedRef, "down", duration);
                break;
            case Actions.LEFT:
                setButtonPress(agentIndex, agents[agentIndex].isButtonLeftPressedRef, "left", duration);
                break;
            case Actions.RIGHT:
                setButtonPress(agentIndex, agents[agentIndex].isButtonRightPressedRef, "right", duration);
                break;
            case Actions.JUMP:
                setButtonPress(agentIndex, agents[agentIndex].isButtonJumpPressedRef, "jump", duration);
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
                AgentsCount
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
