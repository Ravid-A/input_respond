import BattleLog from './BattleLog';
import BattleCard from './BattleCard';

import styles from '../styles/BattleArena.module.css';

export default function BattleArena({selectedPokemon, log, status, setStatus, handleAttack, handleRage, handleRefresh, current_turn})
{

    return (
        <div className={styles.BattleArena}>
            <div style={{
                display: 'flex'
            }}>
                <div className={styles.Pokemon}>
                    {selectedPokemon.pokemon1 && (
                        <BattleCard 
                            pokemon={selectedPokemon.pokemon1}
                            onAttack={handleAttack}
                            onRage={handleRage}
                            fighting={current_turn == 0}
                            isBattleStarted = {status === "start"}
                        />
                    )}
                </div>
                <BattleLog log={log}/>
                <div className={styles.Pokemon}>
                    {selectedPokemon.pokemon2 && (
                        <BattleCard 
                            pokemon={selectedPokemon.pokemon2}
                            onAttack={handleAttack}
                            onRage={handleRage}
                            fighting={current_turn==1}
                            isBattleStarted = {status === "start"}
                        />
                    )}
                </div>
            </div>
            <div style={{
                display: (status !== "prepare") ? 'block' : 'none',
                textAlign: 'center',
            }}>
                    {status !== "end" && (
                        <button 
                            className={styles.button}
                            onClick={() => setStatus("start")}
                            disabled={status === "start"}
                        >
                            Start Battle
                        </button>
                    )}

                    {status === "end" && (
                        <button 
                            className={styles.button}
                            onClick={handleRefresh}
                        >
                            Refresh
                        </button>
                    )}
            </div>
        </div>
    )
}