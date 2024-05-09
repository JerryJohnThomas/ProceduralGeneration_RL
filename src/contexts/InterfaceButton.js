import { useRef } from "react";
import { createContext, useContext, useState } from "react";

const InterfaceButtonContext = createContext({});

export const InterfaceButtonProvider = (props) => {
    const isButtonUpPressedRef = useRef(false);
    const isButtonDownPressedRef = useRef(false);
    const isButtonLeftPressedRef = useRef(false);
    const isButtonRightPressedRef = useRef(false);
    const isButtonJumpPressedRef = useRef(false);
    const isButtonFreeRoamToggledRef = useRef(false);
    const isButtonDebugToggledRef = useRef(true);
    const isButtonResetToggledRef = useRef(true);
    const [isButtonDebugToggledState,setisButtonDebugToggledState] = useState(true);

    return (
        <InterfaceButtonContext.Provider
            value={{
                isButtonUpPressedRef,
                isButtonDownPressedRef,
                isButtonLeftPressedRef,
                isButtonRightPressedRef,
                isButtonJumpPressedRef,
                isButtonFreeRoamToggledRef,
                isButtonDebugToggledRef,
                isButtonDebugToggledState,
                setisButtonDebugToggledState,
                isButtonResetToggledRef
            }}
        >
            {props.children}
        </InterfaceButtonContext.Provider>
    );
};

export const useInterfaceButton = () => {
    return useContext(InterfaceButtonContext);
};
