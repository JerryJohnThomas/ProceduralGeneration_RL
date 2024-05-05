import React from "react";
import "./InterfaceMovement.css";
import { useKeyboardControls } from "@react-three/drei";

function InterfaceMovement() {
    const [set, get] = useKeyboardControls();
    const moveButtonHandler = (key) => {
        // alert(key);
        // Create a new keyboard event with the specified key
        const event = new KeyboardEvent("keydown", { key });
        // Dispatch the event on the document
        console.log(event);
        set(key);
        console.log(set);
        // document.dispatchEvent(event);
        // Dispatch a synthetic keyboard event
        document.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: key,
                bubbles: true,
                cancelable: true,
                keyCode: key.charCodeAt(0),
                which: key.charCodeAt(0),
            })
        );
    };
    return (
        <>
        <div className="ButtonContainer_left">
            <div>
                <button className="button_move" onClick={() => moveButtonHandler("W")} tabIndex={0}>
                    UP
                </button>
            </div>
            <div>
                <button className="button_move" onClick={() => moveButtonHandler("s")} tabIndex={0}>
                    DOWN
                </button>
                <button className="button_move" onClick={() => moveButtonHandler("a")} tabIndex={0}>
                    LEFT
                </button>
                <button className="button_move" onClick={() => moveButtonHandler("d")} tabIndex={0}>
                    RIGHT
                </button>
            </div>

        </div>
        <div className="ButtonContainer_right">

                <button className="button_move" onClick={() => moveButtonHandler(" ")} tabIndex={0}>
                    JUMP
                </button>
            </div>
        </>

    );
}

export default InterfaceMovement;
