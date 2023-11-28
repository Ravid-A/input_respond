import { useReducer, useState } from 'react';

import BattleLog from './BattleLog';
import BattleCard from './BattleCard';

import logReducer from "../utils/logReducer";

import { useSelectedPokemons, useSetSelectedPokemons } from '../utils/Contexts/selectedPokemonsContext.js';
import { useStatus, useSetStatus } from "../utils/Contexts/statusContext.js";

import styles from '../styles/BattleArena.module.css';

function get_damage(damage) 
{
    const {low, high} = damage;

    return Math.floor(Math.random() * (high - low + 1) + low);
}

export default function BattleArena({pokemons})
{
    const selectedPokemons = useSelectedPokemons();
    const setSelectedPokemons = useSetSelectedPokemons();

    const status = useStatus();
    const setStatus = useSetStatus();

    const [current_turn, setCurrentTurn] = useState(0);

    const [log, dispatch] = useReducer(logReducer, []);

    function handleAttack(pokemon, rage = false) 
    {
        const damage = get_damage(pokemon.attack.damage) * (rage ? 2 : 1);
        const dodge = Math.random() < (rage ? 0.25 : 0.5);
        
        const target_index = (current_turn + 1) % 2;

        if(!dodge)
        {
            updatePokemon(target_index, damage);
        }

        setCurrentTurn(target_index);

        dispatch({
            type: "add",
            attacker: pokemon,
            target: selectedPokemons[target_index],
            attack: pokemon.attack,
            damage: damage,
            dodge: dodge,
            rage: rage,
        });
    }

    function updatePokemon(target_index, damage)
    {
        const target = selectedPokemons[target_index];

        const new_hp = Math.max(target.hp - damage, 0);

        selectedPokemons[target_index] = {
            ...selectedPokemons[target_index],
            hp: new_hp,
        };

        setSelectedPokemons([...selectedPokemons]);

        if(new_hp === 0)
        {
            document.getElementById("pokename").innerHTML = selectedPokemons[current_turn].name;
            setStatus("end");
            return;
        }
    }

    function handleRefresh()
    {
        setSelectedPokemons([]);

        setCurrentTurn(0);

        dispatch({
            type: "reset",
        });

        document.getElementById("pokename").innerHTML = "";

        setStatus("prepare");
    }

    return (
        <div className={styles.BattleArena}>
            <h1 style={{
                display: (status === "end") ? 'block' : 'none',
                textAlign: 'center',
                color: 'green',
            }}><span id="pokename"></span> Won The Battle!</h1>
            <div style={{
                display: 'flex'
            }}>
                <div className={styles.Pokemon}>
                    {selectedPokemons[0] && (
                        <BattleCard 
                            pokemon={selectedPokemons[0]}
                            onAttack={handleAttack}
                            fighting={current_turn == 0}
                            isBattleStarted = {status === "start"}
                        />
                    )}
                </div>
                <BattleLog log={log}/>
                <div className={styles.Pokemon}>
                    {selectedPokemons[1] && (
                        <BattleCard 
                            pokemon={selectedPokemons[1]}
                            onAttack={handleAttack}
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