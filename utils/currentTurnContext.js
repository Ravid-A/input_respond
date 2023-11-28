import { useState, createContext, useContext } from "react";

export const CurrentTurnContext = createContext();
export const SetCurrentTurnContext = createContext();

export function CurrentTurnProvider({ children }) {
    const [currentTurn, setCurrentTurn] = useState(0);

    return (
        <CurrentTurnContext.Provider value={currentTurn}>
            <SetCurrentTurnContext.Provider value={setCurrentTurn}>
                {children}
            </SetCurrentTurnContext.Provider>
        </CurrentTurnContext.Provider>
    );
}

export function useCurrentTurn() {
    return useContext(CurrentTurnContext);
}

export function useSetCurrentTurn() {
    return useContext(SetCurrentTurnContext);
}