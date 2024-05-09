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
        isButtonResetToggledRef,
    } = useInterfaceButton();

    const moveButtonHandler = (key, isPressed) => {
        console.log("boom");
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
            case "reset":
                isButtonResetToggledRef.current = isPressed;
                break;
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
                        onTouchStart={() => moveButtonHandler("W", true)}
                        onMouseOut={() => moveButtonHandler("W", false)}
                        onTouchEnd={() => moveButtonHandler("W", true)}
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
                        onTouchStart={() => moveButtonHandler("a", true)}
                        onMouseOut={() => moveButtonHandler("a", false)}
                        onTouchEnd={() => moveButtonHandler("a", true)}
                        tabIndex={0}
                    >
                        LEFT
                    </button>
                    <button
                        className="button_move"
                        onMouseDown={() => moveButtonHandler("s", true)}
                        onMouseUp={() => moveButtonHandler("s", false)}
                        onTouchStart={() => moveButtonHandler("s", true)}
                        onMouseOut={() => moveButtonHandler("s", false)}
                        onTouchEnd={() => moveButtonHandler("s", true)}
                        tabIndex={0}
                    >
                        DOWN
                    </button>
                    <button
                        className="button_move"
                        onMouseDown={() => moveButtonHandler("d", true)}
                        onMouseUp={() => moveButtonHandler("d", false)}
                        onTouchStart={() => moveButtonHandler("d", true)}
                        onMouseOut={() => moveButtonHandler("d", false)}
                        onTouchEnd={() => moveButtonHandler("d", true)}
                        tabIndex={0}
                    >
                        RIGHT
                    </button>
                </div>
            </div>
            <div className="ButtonContainer_right">
                <button className="button_move" onClick={() => moveButtonHandler("reset", !isButtonResetToggledRef.current)} tabIndex={0}>
                    RESET
                </button>
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
                    onTouchStart={() => moveButtonHandler(" ", false)}
                    onMouseOut={() => moveButtonHandler(" ", false)}
                    onTouchEnd={() => moveButtonHandler(" ", false)}
                    tabIndex={0}
                >
                    JUMP
                </button>
            </div>
        </>
    );
}

export default InterfaceMovement;
