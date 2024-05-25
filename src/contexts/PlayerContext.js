import React, { createContext, useContext, useRef, useState } from "react";
import { vec3 } from "@react-three/rapier";
import * as THREE from "three";
import { Actions, MOVEMENT_SPEED, JUMP_FORCE, ROTATION_SPEED } from "../Class/Actions";

import { useFrame} from "@react-three/fiber";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    
    const isButtonUpPressedRef = useRef(false);
    const isButtonDownPressedRef = useRef(false);
    const isButtonLeftPressedRef = useRef(false);
    const isButtonRightPressedRef = useRef(false);
    const isButtonJumpPressedRef = useRef(false);


    // this will be only used in guygym and not anywhere else
    const rb = useRef();

    const getPosition = () => {
        return rb.current.translation();
    };

    const getRotation = () => {
        return rb.current.rotation();
    };


    const resetPlayer = () => {
        const position = vec3(0, 0, 0);
        rb.current.setTranslation(position, true);
    };

    const timeoutRefs = useRef({
        up: null,
        down: null,
        left: null,
        right: null,
        jump: null
    });


    
    const setButtonPress = (ref, timeoutKey, duration) => {
        ref.current = true;

        if (timeoutRefs.current[timeoutKey]) {
            clearTimeout(timeoutRefs.current[timeoutKey]);
        }

        timeoutRefs.current[timeoutKey] = setTimeout(() => {
            ref.current = false;
            timeoutRefs.current[timeoutKey] = null;
        }, duration);
    };

    // const setButtonPress = (ref, duration) => {
    //     console.log("button pressed");
    //     ref.current = true;
    //     console.log(isButtonUpPressedRef.current);
    //     setTimeout(() => {
    //         ref.current = false;
    //     }, duration);
    // };


    const moveAgent = (action, duration = 100) => {
        switch (action) {
            case Actions.FORWARD:
                setButtonPress(isButtonUpPressedRef, "up",duration);
                break;
            case Actions.BACKWARD:
                setButtonPress(isButtonDownPressedRef,"down", duration);
                break;
            case Actions.LEFT:
                setButtonPress(isButtonLeftPressedRef, "left", duration);
                break;
            case Actions.RIGHT:
                setButtonPress(isButtonRightPressedRef, "right", duration);
                break;
            case Actions.JUMP:
                setButtonPress(isButtonJumpPressedRef, "jump", duration);
                break;
            case Actions.NONE:
            default:
                break;
        }
    };


    return (
        <PlayerContext.Provider value={{
            rb,
            moveAgent,
            getPosition,
            getRotation,
            isButtonUpPressedRef,
            isButtonDownPressedRef,
            isButtonLeftPressedRef,
            isButtonRightPressedRef,
            isButtonJumpPressedRef,
        }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
