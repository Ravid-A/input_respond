import { useState } from "react";
import {pokemons} from "../data/pokemons";

import PokemonList from "../components/PokemonList";
import BattleArena from "../components/BattleArena";

import { SelectedPokemonsProvider } from "../utils/Contexts/selectedPokemonsContext.js";
import { StatusProvider } from "../utils/Contexts/statusContext.js";

export default function Home() {
    return (
        <>
            <SelectedPokemonsProvider>
                <StatusProvider>
                    <PokemonList
                        pokemons={pokemons}
                    />

                    <BattleArena 
                        pokemons={pokemons}
                    />
                </StatusProvider>
            </SelectedPokemonsProvider>
        </>
    );
};