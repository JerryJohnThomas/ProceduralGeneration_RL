import { useRef } from "react";

export const useInitializeAgent = (id, startingPos = { x: 0, y: 2, z: 0 }) => {
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
