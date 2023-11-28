import PokemonInfo from "./PokemonInfo"

import { usePokemonInfo, useSetPokemonInfo } from "../utils/pokemonInfoContext.js";
import { useSelectedPokemons  } from "../utils/selectedPokemonsContext.js";
import { useLogDispatch } from "../utils/battleReducerContext.js";

import styles from '../styles/PokemonCard.module.css';

export default function PokemonCard({pokemon})
{
    const pokemonInfo = usePokemonInfo();
    const setPokemonInfo = useSetPokemonInfo();

    const selectedPokemons = useSelectedPokemons();

    const dispatch = useLogDispatch();

    function onSelect(pokemon)
    {
        dispatch({
            type: "select",
            pokemon: pokemon,
        });

        if(selectedPokemons.length === 1)
        {
            dispatch({
                type: "ready",
            });
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