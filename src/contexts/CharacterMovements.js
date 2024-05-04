// THIS IS A WASTE FILE it is not used anywhere

import { createContext, useContext, useState } from "react";

const CharacterMovementsContext = createContext({});

export const CharacterMovementsProvider = (props) => {
    const [position, setPosition] = useState([0,0,0]);

    return (
        <CharacterMovementsContext.Provider
            value={{
                position,
                setPosition,
            }}
        >
            {props.children}
        </CharacterMovementsContext.Provider>
    );
};

export const useCharacterMovements = () => {
    return useContext(CharacterMovementsContext);
};
