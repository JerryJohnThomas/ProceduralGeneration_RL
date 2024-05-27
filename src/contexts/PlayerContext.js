import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { vec3 } from "@react-three/rapier";
import * as THREE from "three";
import { Actions, MOVEMENT_SPEED, JUMP_FORCE, ROTATION_SPEED } from "../Class/Actions";
import { useFrame } from "@react-three/fiber";

const PlayerContext = createContext();

const InitializeAgent = (id, startingPos = { x: 0, y: 2, z: 0 }) => {
    return {
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
    };
};
export const PlayerProvider = ({ children }) => {
    // I think this can only be put here
    let AgentsCount = useRef(3);

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

    
    const getObservation = (agent) => {
        const agentPos = agent.rb.current.translation();
        const relativePos = {
            x: agent.targetPosition.x - agentPos.x,
            y: agent.targetPosition.y - agentPos.y,
            z: agent.targetPosition.z - agentPos.z
        };
        const distanceToGoal = Math.sqrt(relativePos.x**2 + relativePos.y**2 + relativePos.z**2);
        return {
            relativePos,
            distanceToGoal,
            previousBlock: agent.previousBlock,
        };
    };

    const step = (action, agent) => {
        moveAgent(action, agent);
        const observation = getObservation(agent);
        const done = observation.distanceToGoal < 1; // Consider done if the distance is less than 1 unit
        const reward = done ? 1 : -0.01; // Reward structure
        agent.previousBlock = action; // Update previous block
        return { observation, reward, done };
    };

    const sampleAction = () => {
        return Actions[Math.floor(Math.random() * Actions.length)];
    };


    return (
        <PlayerContext.Provider
            value={{
                agents,
                moveAgent,
                getPosition,
                getRotation,
                resetAgent,
                AgentsCount,
                getObservation,
                step,
                sampleAction
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
