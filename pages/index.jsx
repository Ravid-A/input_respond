import {pokemons} from "../data/pokemons";

import PokemonList from "../components/PokemonList";
import BattleArena from "../components/BattleArena";

import { SelectedPokemonsProvider } from "../utils/Contexts/selectedPokemonsContext.js";
import { StatusProvider } from "../utils/Contexts/statusContext.js";
import { CurrentTurnProvider } from "../utils/Contexts/currentTurnContext.js";

export default function Home() {
    return (
        <>
            <SelectedPokemonsProvider>
                <StatusProvider>
                    <PokemonList
                        pokemons={pokemons}
                    />

                    <CurrentTurnProvider>
                        <BattleArena 
                            pokemons={pokemons}
                        />
                    </CurrentTurnProvider>
                </StatusProvider>
            </SelectedPokemonsProvider>
        </>
    );
};