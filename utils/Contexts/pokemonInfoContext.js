import { createContext, useContext } from "react";

export const PokemonInfoContext = createContext();
export const SetPokemonInfoContext = createContext();

export function PokemonInfoProvider({ pokemonInfo, setPokemonInfo, children }) {

  return (
    <PokemonInfoContext.Provider value={pokemonInfo}>
      <SetPokemonInfoContext.Provider value={setPokemonInfo}>
        {children}
      </SetPokemonInfoContext.Provider>
    </PokemonInfoContext.Provider>
  );
}

export function usePokemonInfo() {
    return useContext(PokemonInfoContext);
}

export function useSetPokemonInfo() {
    return useContext(SetPokemonInfoContext);
}