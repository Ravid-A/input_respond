import { useState, useReducer } from "react";
import {pokemons} from "../data/pokemons";

import PokemonList from "../components/PokemonList";
import PokemonCard from "../components/PokemonCard";
import BattleLog from "../components/BattleLog";

import styles from "../styles/index.module.css";

import logReducer from "../utils/logReducer";

function get_damage(damage) 
{
    const {low, high} = damage;

    return Math.floor(Math.random() * (high - low + 1) + low);
}

export default function Home() {

    const [selectedPokemon, setSelectedPokemon] = useState({
        pokemon1: null,
        pokemon2: null,
    });

    const [status, setStatus] = useState("prepare");
    const [current_turn, setCurrentTurn] = useState(0);

    const [log, dispatch] = useReducer(logReducer, []);

    function handleSelect(pokemon) {
        const pokemon_copy = {...pokemon};
        if (!selectedPokemon.pokemon1) {
            pokemon.isInBattle = true;
            setSelectedPokemon({
                ...selectedPokemon,
                pokemon1: pokemon_copy,
            });
        } else if (!selectedPokemon.pokemon2) {
            pokemon.isInBattle = true;
            setSelectedPokemon({
                ...selectedPokemon,
                pokemon2: pokemon_copy,
            });
            setStatus("ready");
        }
    }

    function handleAttack(pokemon, index) 
    {
        const damage = get_damage(pokemon.attack.damage);
        const dodge = Math.random() < 0.25;
        
        const target = (index === 0 ? selectedPokemon.pokemon2 : selectedPokemon.pokemon1);

        if(!dodge)
        {
            updatePokemon(target, index, damage);
        }

        setCurrentTurn((current_turn + 1) % 2);

        dispatch({
            type: "add",
            attacker: pokemon,
            target: target,
            attack: pokemon.attack,
            damage: damage,
            dodge: dodge,
            rage: false,
        });
    }

    function handleRage(pokemon, index) 
    {
        const damage = get_damage(pokemon.attack.damage) * 2;

        const dodge = Math.random() < 0.5;

        const target = (index === 0 ? selectedPokemon.pokemon2 : selectedPokemon.pokemon1);

        if(!dodge)
        {
            updatePokemon(target, index, damage);
        }

        setCurrentTurn((current_turn + 1) % 2);

        dispatch({
            type: "add",
            attacker: pokemon,
            target: target,
            attack: pokemon.attack,
            damage: damage,
            dodge: dodge,
            rage: true,
        });
    }

    function updatePokemon(target, index, damage)
    {
        const new_hp = target.hp - damage;
        target.hp = (new_hp < 0 ? 0 : new_hp);
        if(index === 0)
        {
            setSelectedPokemon({
                ...selectedPokemon,
                pokemon2: target
            });
        } else {
            setSelectedPokemon({
                ...selectedPokemon,
                pokemon1: target
            });
        }

        if(target.hp === 0)
        {
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

        setStatus("prepare");
    }

    return (
        <>
            <div>
                <PokemonList pokemons={pokemons} onSelect={handleSelect}/>

                <div className={styles.BattleArena}>
                    <div style={{
                        display: 'flex'
                    }}>
                        <div className={styles.Pokemon}>
                            {selectedPokemon.pokemon1 && (
                                <PokemonCard 
                                    pokemon={selectedPokemon.pokemon1}
                                    onAttack={handleAttack}
                                    onRage={handleRage}
                                    index = {0}
                                    current_turn = {current_turn}
                                    isBattleStarted = {status === "start"}
                                />
                            )}
                        </div>
                        <BattleLog log={log}/>
                        <div className={styles.Pokemon}>
                            {selectedPokemon.pokemon2 && (
                                <PokemonCard 
                                    pokemon={selectedPokemon.pokemon2}
                                    onAttack={handleAttack}
                                    onRage={handleRage}
                                    index = {1}
                                    current_turn = {current_turn}
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
            </div>
        </>
    );
};