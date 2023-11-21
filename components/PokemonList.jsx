import {useState} from 'react';
import PokemonInfo from './PokemonInfo';

import styles from '../styles/PokemonList.module.css';

export default function PokemonList({pokemons, onSelect}) {

    const [selectedPokemon, setSelectedPokemon] = useState(null);

    function handleInfo(pokemon) {
        setSelectedPokemon(pokemon);
    }

    function handleCloseInfo() {
        setSelectedPokemon(null);
    }

    return (
    <div className={styles.pokemonList}>
        {pokemons.map(pokemon => (
            <div key={pokemon.name} className={styles.pokemonCard}>
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
        ))}
    </div>
    );
}