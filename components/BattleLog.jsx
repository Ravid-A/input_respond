import { useLog } from '../utils/battleReducerContext.js';

import styles from '../styles/BattleLog.module.css';

export default function BattleLog() {
    const log = useLog();

    return (
        <textarea className={styles.BattleLog} disabled = {true} value={log.join('\n')} />
    );
};