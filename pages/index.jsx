import {pokemons} from "../data/pokemons";

import PokemonList from "../components/PokemonList";
import BattleArena from "../components/BattleArena";

import { SelectedPokemonsProvider } from "../utils/selectedPokemonsContext.js";
import { StatusProvider } from "../utils/statusContext.js";
import { CurrentTurnProvider } from "../utils/currentTurnContext.js";
import { BattleProvider } from "../utils/battleReducerContext.js";

export default function Home() {
    return (
        <>
            <SelectedPokemonsProvider>
                <StatusProvider>
                    <CurrentTurnProvider>
                        <BattleProvider>
                            <PokemonList
                                pokemons={pokemons}
                            />

                            <BattleArena 
                                pokemons={pokemons}
                            />
                        </BattleProvider>
                    </CurrentTurnProvider>
                </StatusProvider>
            </SelectedPokemonsProvider>
        </>
    );
};