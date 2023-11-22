import { useReducer, useState } from 'react';

import BattleLog from './BattleLog';
import BattleCard from './BattleCard';

import logReducer from "../utils/logReducer";

import styles from '../styles/BattleArena.module.css';

function get_damage(damage) 
{
    const {low, high} = damage;

    return Math.floor(Math.random() * (high - low + 1) + low);
}

export default function BattleArena({pokemons, selectedPokemon, setSelectedPokemon, status, setStatus})
{
    const [current_turn, setCurrentTurn] = useState(0);

    const [log, dispatch] = useReducer(logReducer, []);

    function handleAttack(pokemon, rage = false) 
    {
        const damage = get_damage(pokemon.attack.damage) * (rage ? 2 : 1);
        const dodge = Math.random() < (rage ? 0.25 : 0.5);
        
        const target = (current_turn === 0 ? selectedPokemon.pokemon2 : selectedPokemon.pokemon1);

        if(!dodge)
        {
            updatePokemon(target.hp, damage);
        }

        setCurrentTurn((current_turn + 1) % 2);

        dispatch({
            type: "add",
            attacker: pokemon,
            target: target,
            attack: pokemon.attack,
            damage: damage,
            dodge: dodge,
            rage: rage,
        });
    }

    function updatePokemon(hp, damage)
    {
        const winner = (current_turn === 0 ? selectedPokemon.pokemon1 : selectedPokemon.pokemon2);
        
        const new_hp = Math.max(hp - damage, 0);
        if(current_turn === 0)
        {
            setSelectedPokemon({
                ...selectedPokemon,
                pokemon2: {
                    ...selectedPokemon.pokemon2,
                    hp: new_hp
                }
            });
        } else {
            setSelectedPokemon({
                ...selectedPokemon,
                pokemon1: {
                    ...selectedPokemon.pokemon1,
                    hp: new_hp
                }
            });
        }

        if(new_hp === 0)
        {
            document.getElementById("pokename").innerHTML = winner.name;
            setStatus("end");
            return;
        }
    }

    function handleRefresh()
    {
        pokemons.map((pokemon) => {
            pokemon.isInBattle = false;
            return pokemon;
        });

        setSelectedPokemon({
            pokemon1: null,
            pokemon2: null,
        });

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
                    {selectedPokemon.pokemon1 && (
                        <BattleCard 
                            pokemon={selectedPokemon.pokemon1}
                            onAttack={handleAttack}
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