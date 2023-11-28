import BattleLog from './BattleLog';
import BattleCard from './BattleCard';

import { useStatus, useSetStatus } from "../utils/statusContext.js";
import { useLogDispatch } from "../utils/battleReducerContext.js";

import styles from '../styles/BattleArena.module.css';

export default function BattleArena({pokemons})
{
    return (    
        <div className={styles.BattleArena}>
            <div style={{ display: 'flex' }}>
                <BattleCard 
                    index = {0}
                />  
                <BattleLog />
                <BattleCard 
                    index = {1}
                /> 
            </div>
            <BattleControl />
        </div>
    )
}

function BattleControl()
{
    const status = useStatus();

    const dispatch = useLogDispatch();

    if(status === "dead")
    {
        dispatch({
            type: "end",
        });
    }

    function handleRefresh()
    {
        dispatch({
            type: "reset",
        });
    }
    
    function handleStart()
    {
        dispatch({
            type: "start",
        });
    }

    return (
        <div style={{
            display: (status !== "prepare") ? 'block' : 'none',
            textAlign: 'center',
        }}>
                {(status === "start" || status === "ready") && (
                    <button 
                        className={styles.button}
                        onClick={handleStart}
                        disabled={status === "battle"}
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
    )
}