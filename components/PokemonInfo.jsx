import styles from '../styles/PokemonInfo.module.css';

export default function PokemonInfo({hp, attack, onClose}) 
{
    return (
    <div className={styles.pokemonInfo}>
        <div>HP: {hp}</div>
        <div>Attack: {attack.name}</div>
        <div>Damage: {attack.damage.low} - {attack.damage.high}</div>
        <button className={styles.button} onClick={onClose}>Close</button>
    </div>
    );
}