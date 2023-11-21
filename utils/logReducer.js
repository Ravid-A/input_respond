export default function logReducer(log, action) {
    switch (action.type) {
        case "add":
        {
            return [
                ...log,
                {
                    attacker: action.attacker,
                    target: action.target,
                    attack: action.attack,
                    damage: action.damage,
                    dodge: action.dodge,
                    rage: action.rage,
                },
            ];
            break;
        } 
        case "reset":
        {
            return [];
        }  
    } 
}