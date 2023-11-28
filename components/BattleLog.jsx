import { useRef, useEffect } from 'react';

import { useLog } from '../utils/battleReducerContext.js';

import styles from '../styles/BattleLog.module.css';

export default function BattleLog() {
    const log = useLog();

    const textareaRef = useRef();

    useEffect(() => {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight; 
    }, [log]);

    return (
        <textarea 
            ref = {textareaRef}
            className={styles.BattleLog} 
            disabled = {true} 
            value={log.join('\n')} 
        />
    );
};