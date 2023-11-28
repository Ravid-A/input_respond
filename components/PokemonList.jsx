import {useState} from 'react';
import PokemonCard from './PokemonCard';

import { PokemonInfoProvider } from '../utils/Contexts/pokemonInfoContext';

import styles from '../styles/PokemonList.module.css';

export default function PokemonList({pokemons}) {

    const [pokemonInfo, setPokemonInfo] = useState(null);
    
    return (
        <PokemonInfoProvider pokemonInfo = {pokemonInfo}  setPokemonInfo={setPokemonInfo}>
            <div className={styles.pokemonList}>
                {pokemons.map(pokemon => (
                <PokemonCard 
                        key={pokemon.name}
                        pokemon={pokemon}
                    />
                ))}
            </div>
        </PokemonInfoProvider>
    );
}