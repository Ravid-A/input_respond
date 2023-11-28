import { useSetPokemonInfo } from '../utils/pokemonInfoContext';

import styles from '../styles/PokemonInfo.module.css';

export default function PokemonInfo({hp, attack}) 
{
    const setPokemonInfo = useSetPokemonInfo();

    return (
    <div className={styles.pokemonInfo}>
        <div>HP: {hp}</div>
        <div>Attack: {attack.name}</div>
        <div>Damage: {attack.damage.low} - {attack.damage.high}</div>
        <button className={styles.button} onClick={() => {setPokemonInfo(null)}}>Close</button>
    </div>
    );
}