import { useState } from "react";
import {pokemons} from "../data/pokemons";

import PokemonList from "../components/PokemonList";
import BattleArena from "../components/BattleArena";

export default function Home() {

    const [selectedPokemon, setSelectedPokemon] = useState({pokemon1: null, pokemon2: null});

    const [status, setStatus] = useState("prepare");

    function handleSelect(pokemon) {
        if (!selectedPokemon.pokemon1) {
            pokemon.isInBattle = true;
            setSelectedPokemon({
                ...selectedPokemon,
                pokemon1: {...pokemon},
            });
        } else if (!selectedPokemon.pokemon2) {
            pokemon.isInBattle = true;
            setSelectedPokemon({
                ...selectedPokemon,
                pokemon2: {...pokemon},
            });
            setStatus("ready");
        }
    }

    return (
        <>
            <PokemonList 
                pokemons={pokemons} 
                onSelect={handleSelect}
            />

            <BattleArena 
                pokemons={pokemons}
                selectedPokemon={selectedPokemon} 
                setSelectedPokemon={setSelectedPokemon}
                status={status}
                setStatus={setStatus}
            />
        </>
    );
};