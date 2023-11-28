import { useSelectedPokemons } from '../utils/selectedPokemonsContext';
import { useCurrentTurn } from '../utils/currentTurnContext';
import { useLogDispatch } from '../utils/battleReducerContext';
import { useStatus } from '../utils/statusContext';

import styles from '../styles/BattleCard.module.css'

export default function BattleCard({index}) {

    const selectedPokemons = useSelectedPokemons();
    const current_turn = useCurrentTurn();

    const pokemon = selectedPokemons[index];
    const fighting = selectedPokemons[current_turn] === pokemon;

    return (
        <div className={styles.pokemonCard}>
            {selectedPokemons.length > index && CardData(pokemon, fighting)}
        </div>
    )
}

function CardData(pokemon, fighting)
{
    const current_turn = useCurrentTurn();

    const dispatch = useLogDispatch();
    const status = useStatus();

    const isBattleStarted = status === "start";

    function onAttack(pokemon, rage=false)
    {
        const target_index = (current_turn + 1) % 2;
        dispatch({
            type: "attack",
            pokemon: pokemon,
            rage: rage,
            target_index: target_index,
        });
    }

    return (
        <>
            <img src={pokemon.imgLink} alt={pokemon.name}/>
            <div
                className={styles.name}
            >
                {pokemon.name}
            </div>
            <div className={styles.healthbar}>
            <div 
                className={styles.health}
                style={{width: `${pokemon.hp}%`}} 
            />
            </div>
        
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
        </>
    )
}