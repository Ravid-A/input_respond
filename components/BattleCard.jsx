import { useSelectedPokemons } from '../utils/Contexts/selectedPokemonsContext';
import { useCurrentTurn } from '../utils/Contexts/currentTurnContext';

import styles from '../styles/BattleCard.module.css'

export default function PokemonCard({pokemon, onAttack, isBattleStarted}) {

    const selectedPokemons = useSelectedPokemons();
    const currentTurn = useCurrentTurn();

    const fighting = selectedPokemons[currentTurn] === pokemon;

    return (
        <div key={pokemon.name} className={styles.pokemonCard}>
            <img src={pokemon.imgLink} alt={pokemon.name}/>
            <div>{pokemon.name}</div>
            <div>HP: {pokemon.hp} HP</div>

            <button 
                className={styles.button}
                style={
                    isBattleStarted ? {display: ''} : {display: 'none'}
                }
                onClick={() => onAttack(pokemon)} 
                disabled={!fighting} 
            >
            Attack
            </button>

            <button 
                className={styles.button}
                style={
                    isBattleStarted ? {display: ''} : {display: 'none'}
                }
                onClick={() => onAttack(pokemon, true)}  
                disabled={!fighting}
            >
            Rage
            </button>
        </div>
    )
}