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

function logReducer(log, action) {

    const selectedPokemons = useSelectedPokemons();
    const setSelectedPokemons = useSetSelectedPokemons();

    const current_turn = useCurrentTurn();
    const setCurrentTurn = useSetCurrentTurn();

    const setStatus = useSetStatus();

    switch (action.type) {
        case "select":
        {
            const { pokemon } = action;

            if(selectedPokemons.length < 2) {
                setSelectedPokemons([...selectedPokemons, pokemon]);
            }

            return [...log, `${pokemon.name} has joined the battle`];
        }
        case "ready":
        {
            setStatus("ready");
            return [...log, "All pokemons are ready for the battle"];
        }
        case "start":
        {
            setStatus("start");
            return [...log, "Battle has started"];
        }
        case "attack":
        {
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

            return [...log, get_log_text(pokemon, target, damage, dodge, rage)];
        }
        case "end":
        {
            const winner = selectedPokemons[0].hp > 0 ? selectedPokemons[0] : selectedPokemons[1];

            setStatus("end");
            return [...log, `${winner.name} won the battle`];
        }
        case "reset":
        {
            setSelectedPokemons([]);
            setCurrentTurn(0);
            setStatus("prepare");

            return [];
        }  
    } 
}

function get_damage(damage) 
{
    const {low, high} = damage;

    return Math.floor(Math.random() * (high - low + 1) + low);
}

function get_log_text(pokemon, target, damage, dodge, rage)
{
    let logText = `${pokemon.name} attacked ${target.name} using ${pokemon.attack.name} ability`;

    if(rage)
    {
        logText += ` with Rage`;
    }

    if(dodge)
    {
        logText += ` but ${target.name} dodged`;
    } else {
        logText += ` and made ${damage} damage`;
    }

    return logText;
}