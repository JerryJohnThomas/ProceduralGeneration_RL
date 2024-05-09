import { useRef } from "react";
import { createContext, useContext, useState } from "react";

const InterfaceButtonContext = createContext({});

export const InterfaceButtonProvider = (props) => {
    const isButtonUpPressedRef = useRef(false);
    const isButtonDownPressedRef = useRef(false);
    const isButtonLeftPressedRef = useRef(false);
    const isButtonRightPressedRef = useRef(false);
    const isButtonJumpPressedRef = useRef(false);

    return (
        <InterfaceButtonContext.Provider
            value={{
                isButtonUpPressedRef,
                isButtonDownPressedRef,
                isButtonLeftPressedRef,
                isButtonRightPressedRef,
                isButtonJumpPressedRef
            }}
        >
            {props.children}
        </InterfaceButtonContext.Provider>
    );
};

export const useInterfaceButton = () => {
    return useContext(InterfaceButtonContext);
};
