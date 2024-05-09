import React, { useEffect } from "react";
import "./InterfaceMovement.css";
import { useInterfaceButton } from "../contexts/InterfaceButton";

function InterfaceMovement() {
    const {
        isButtonUpPressedRef,
        isButtonDownPressedRef,
        isButtonLeftPressedRef,
        isButtonRightPressedRef,
        isButtonJumpPressedRef,
        isButtonFreeRoamToggledRef,
        isButtonDebugToggledRef,
        isButtonDebugToggledState,
        setisButtonDebugToggledState,
    } = useInterfaceButton();

    const moveButtonHandler = (key, isPressed) => {
        switch (key.toLowerCase()) {
            case "w":
                isButtonUpPressedRef.current = isPressed;
                break;
            case "s":
                isButtonDownPressedRef.current = isPressed;
                break;
            case "a":
                isButtonLeftPressedRef.current = isPressed;
                break;
            case "d":
                isButtonRightPressedRef.current = isPressed;
                break;
            case " ":
                isButtonJumpPressedRef.current = isPressed;
                break;
            case "free":
                isButtonFreeRoamToggledRef.current = isPressed;
            // case "debug":
            //     isButtonDebugToggledRef.current = isPressed;
            //     break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="ButtonContainer_left">
                <div>
                    <button
                        className="button_move"
                        onMouseDown={() => moveButtonHandler("W", true)}
                        onMouseUp={() => moveButtonHandler("W", false)}
                        onMouseOut={() => moveButtonHandler("W", false)}
                        tabIndex={0}
                    >
                        UP
                    </button>
                </div>
                <div>
                    <button
                        className="button_move"
                        onMouseDown={() => moveButtonHandler("a", true)}
                        onMouseUp={() => moveButtonHandler("a", false)}
                        onMouseOut={() => moveButtonHandler("a", false)}
                        tabIndex={0}
                    >
                        LEFT
                    </button>
                    <button
                        className="button_move"
                        onMouseDown={() => moveButtonHandler("s", true)}
                        onMouseUp={() => moveButtonHandler("s", false)}
                        onMouseOut={() => moveButtonHandler("s", false)}
                        tabIndex={0}
                    >
                        DOWN
                    </button>
                    <button
                        className="button_move"
                        onMouseDown={() => moveButtonHandler("d", true)}
                        onMouseUp={() => moveButtonHandler("d", false)}
                        onMouseOut={() => moveButtonHandler("d", false)}
                        tabIndex={0}
                    >
                        RIGHT
                    </button>
                </div>
            </div>
            <div className="ButtonContainer_right">
                <button className="button_move" onClick={() => setisButtonDebugToggledState((x) => !x)} tabIndex={0}>
                    DEBUG
                </button>
                <button className="button_move" onClick={() => moveButtonHandler("free", !isButtonFreeRoamToggledRef.current)} tabIndex={0}>
                    FREE SEE
                </button>
                <button
                    className="button_move"
                    onMouseDown={() => moveButtonHandler(" ", true)}
                    onMouseUp={() => moveButtonHandler(" ", false)}
                    onMouseOut={() => moveButtonHandler(" ", false)}
                    tabIndex={0}
                >
                    JUMP
                </button>
            </div>
        </>
    );
}

export default InterfaceMovement;
