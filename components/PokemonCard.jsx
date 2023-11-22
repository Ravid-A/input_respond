import PokemonInfo from "./PokemonInfo"

import styles from '../styles/PokemonCard.module.css';

export default function PokemonCard({pokemon, onSelect, selectedPokemon, handleInfo, handleCloseInfo})
{
    return (
        <div className={styles.pokemonCard}>
            <img src={pokemon.imgLink} alt={pokemon.name}/>
            <div>{pokemon.name} {onSelect && pokemon.isInBattle && <div className={styles.InBattle}>(In Battle)</div>}</div>

            <button 
                className={styles.button} 
                disabled={selectedPokemon === pokemon} 
                onClick={() => handleInfo(pokemon)}
            >
                Info
            </button>

            <button 
                className={styles.button}
                disabled={pokemon.isInBattle}
                onClick={() => onSelect(pokemon)}  
            >
            Select
            </button>

            {selectedPokemon === pokemon && (
            <PokemonInfo 
                hp={pokemon.hp}
                attack={pokemon.attack} 
                onClose={handleCloseInfo}
            />
            )}
        </div>
    )
}