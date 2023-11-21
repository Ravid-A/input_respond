import styles from '../styles/BattleLog.module.css';

export default function BattleLog({log}) {

    //Pikachu attacked Rattata using Static ability with Rage and made 10 damage
    //Pikachu attacked Rattata using Static ability but Rattata dodged

    const logText = log.map((logItem, index) => {
        const {attacker, target, attack, damage, dodge, rage} = logItem;

        let logText = `${attacker.name} attacked ${target.name} using ${attack.name} ability`;

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
    }).reverse();

    return (
        <textarea className={styles.BattleLog} disabled = {true} value={logText.join('\n')} />
    );
};