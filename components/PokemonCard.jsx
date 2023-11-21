import styles from '../styles/PokemonCard.module.css'

export default function PokemonCard({pokemon, onAttack, onRage, index, current_turn, isBattleStarted}) {

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
                onClick={() => onAttack(pokemon, index)} 
                disabled={current_turn !== index} 
            >
            Attack
            </button>

            <button 
                className={styles.button}
                style={
                    isBattleStarted ? {display: ''} : {display: 'none'}
                }
                onClick={() => onRage(pokemon, index)}  
                disabled={current_turn !== index}
            >
            Rage
            </button>
        </div>
    )
}