import { createContext, useContext } from "react";

const CharacterAnimationContext = createContext({});

const CharacterAnimationContextProvider = (props) => {
    return <CharacterAnimationContext.Provider value={{}}>{props.children}</CharacterAnimationContext.Provider>;
};

export const useCharacterAnimations = () => {
    return useContext(CharacterAnimationContext);
};
