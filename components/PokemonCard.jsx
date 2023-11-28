import PokemonInfo from "./PokemonInfo"

import { usePokemonInfo, useSetPokemonInfo } from "../utils/Contexts/pokemonInfoContext.js";
import { useSelectedPokemons ,useSetSelectedPokemons } from "../utils/Contexts/selectedPokemonsContext.js";
import { useSetStatus } from "../utils/Contexts/statusContext.js";

import styles from '../styles/PokemonCard.module.css';

export default function PokemonCard({pokemon})
{
    const pokemonInfo = usePokemonInfo();
    const setPokemonInfo = useSetPokemonInfo();

    const selectedPokemons = useSelectedPokemons();
    const setSelectedPokemons = useSetSelectedPokemons();

    const setStatus = useSetStatus();

    function onSelect(pokemon)
    {
        if(selectedPokemons.length < 2) {
            setSelectedPokemons([...selectedPokemons, pokemon]);
            if(selectedPokemons.length === 1) {
                setStatus("battle");
            }
        }
    }

    function isInBattle(pokemon)
    {
        return selectedPokemons.some((selectedPokemon) => selectedPokemon.name === pokemon.name);
    }

    return (
        <div className={styles.pokemonCard}>
            <img src={pokemon.imgLink} alt={pokemon.name}/>
            <div>{pokemon.name} {isInBattle(pokemon) && <div className={styles.InBattle}>(In Battle)</div>}</div>

            <button 
                className={styles.button} 
                disabled={pokemonInfo === pokemon} 
                onClick={() => setPokemonInfo(pokemon)}
            >
                Info
            </button>

            <button 
                className={styles.button}
                disabled={isInBattle(pokemon) || selectedPokemons.length === 2}
                onClick={() => onSelect(pokemon)}  
            >
            Select
            </button>

            {pokemonInfo === pokemon && (
            <PokemonInfo 
                hp={pokemon.hp}
                attack={pokemon.attack} 
            />
            )}
        </div>
    )
}