import styles from '../styles/BattleCard.module.css'

export default function PokemonCard({pokemon, onAttack, onRage, fighting, isBattleStarted}) {

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
                onClick={() => onRage(pokemon)}  
                disabled={!fighting}
            >
            Rage
            </button>
        </div>
    )
}