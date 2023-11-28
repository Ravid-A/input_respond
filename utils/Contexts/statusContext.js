import { useState, createContext, useContext } from "react";

export const StatusContext = createContext();
export const SetStatusContext = createContext();

export function StatusProvider({ children }) {

  const [status, setStatus] = useState("prepare");

  return (
    <StatusContext.Provider value={status}>
      <SetStatusContext.Provider value={setStatus}>
        {children}
      </SetStatusContext.Provider>
    </StatusContext.Provider>
  );
}

export function useStatus() {
    return useContext(StatusContext);
}

export function useSetStatus() {
    return useContext(SetStatusContext);
}