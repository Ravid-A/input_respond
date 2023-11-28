import { useReducer, useContext, createContext } from "react";

import { useSelectedPokemons, useSetSelectedPokemons } from "./selectedPokemonsContext";
import { useCurrentTurn, useSetCurrentTurn } from "./currentTurnContext";
import { useSetStatus } from "./statusContext";

const battleReducerContext = createContext();
const battleDispatchContext = createContext();

export function BattleProvider({ children }) {
    const [log, dispatch] = useReducer(logReducer, []);

    return (
        <battleReducerContext.Provider value={log}>
            <battleDispatchContext.Provider value={dispatch}>
                {children}
            </battleDispatchContext.Provider>
        </battleReducerContext.Provider>
    );
}

export function useLog() {
    return useContext(battleReducerContext);
}

export function useLogDispatch() {
    return useContext(battleDispatchContext);
}

function logReducer(log, action) 
{
    switch (action.type) {
        case "select":
        {
            return selectPokemon(log, action);
        }
        case "ready":
        {
            return readyForBattle(log);
        }
        case "start":
        {
            return startBattle(log);
        }
        case "attack":
        {
            return attackPokemon(log, action);
        }
        case "end":
        {
            return endBattle(log);
        }
        case "reset":
        {
           return resetBattle(log);
        }
    } 

    throw Error('Unknown action: ' + action.type);
}

function selectPokemon(log, action) 
{
    const selectedPokemons = useSelectedPokemons();
    const setSelectedPokemons = useSetSelectedPokemons();

    const { pokemon } = action;

    if(selectedPokemons.length < 2) {
        setSelectedPokemons([...selectedPokemons, pokemon]);
    }

    return [...log, `• ${pokemon.name} has joined the battle`];
}

function readyForBattle(log) 
{
    const setStatus = useSetStatus();

    setStatus("ready");
    return [...log, "• All pokemons are ready for the battle"];
}

function startBattle(log) 
{
    const setStatus = useSetStatus();

    setStatus("start");
    return [...log, "• Battle has started"];
}

function attackPokemon(log, action) 
{
    function get_damage(damage) 
    {
        const {low, high} = damage;
    
        return Math.floor(Math.random() * (high - low + 1) + low);
    }

    const selectedPokemons = useSelectedPokemons();
    const setSelectedPokemons = useSetSelectedPokemons();

    const current_turn = useCurrentTurn();
    const setCurrentTurn = useSetCurrentTurn();

    const setStatus = useSetStatus();

    const { pokemon, rage } = action;

    const damage = get_damage(pokemon.attack.damage) * (rage ? 2 : 1);
    const dodge = Math.random() < (rage ? 0.25 : 0.5);
    
    const target_index = (current_turn + 1) % 2;
    const target = selectedPokemons[target_index];

    if(!dodge)
    {
        const new_hp = Math.max(target.hp - damage, 0);

        selectedPokemons[target_index] = {
            ...target,
            hp: new_hp,
        };

        if(new_hp === 0)
        {
            setStatus("dead");
        }

        setSelectedPokemons([...selectedPokemons]);
    }

    setCurrentTurn(target_index);

    let logText = `• ${pokemon.name} attacked ${target.name} using ${pokemon.attack.name}${rage ? ' with Rage' : ''}.${dodge ? ` ${target.name} dodged the attack.` : ` The attack dealt ${damage} damage.`}`;

    return [...log, logText];
}

function endBattle(log) 
{
    const selectedPokemons = useSelectedPokemons();
    const setStatus = useSetStatus();

    const winner = selectedPokemons[0].hp > 0 ? selectedPokemons[0] : selectedPokemons[1];

    setStatus("end");
    return [...log, `• ${winner.name} won the battle`];
}

function resetBattle(log) 
{
    const setSelectedPokemons = useSetSelectedPokemons();
    const setCurrentTurn = useSetCurrentTurn();
    const setStatus = useSetStatus();


    setSelectedPokemons([]);
    setCurrentTurn(0);
    setStatus("prepare");

    return [];
}