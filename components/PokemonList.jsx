import {useState} from 'react';
import PokemonCard from './PokemonCard';

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
           <PokemonCard 
                key={pokemon.name}
                pokemon={pokemon}
                onSelect={onSelect}
                selectedPokemon={selectedPokemon}
                handleInfo={handleInfo}
                handleCloseInfo={handleCloseInfo}
            />
        ))}
    </div>
    );
}