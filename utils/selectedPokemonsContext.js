import { useState, createContext, useContext } from "react";

export const SelectedPokemonsContext = createContext();
export const SetSelectedPokemonsContext = createContext();

export function SelectedPokemonsProvider({ children }) {

  const [selectedPokemons, setSelectedPokemons] = useState([]);

  return (
    <SelectedPokemonsContext.Provider value={selectedPokemons}>
      <SetSelectedPokemonsContext.Provider value={setSelectedPokemons}>
        {children}
      </SetSelectedPokemonsContext.Provider>
    </SelectedPokemonsContext.Provider>
  );
}

export function useSelectedPokemons() {
    return useContext(SelectedPokemonsContext);
}

export function useSetSelectedPokemons() {
    return useContext(SetSelectedPokemonsContext);
}