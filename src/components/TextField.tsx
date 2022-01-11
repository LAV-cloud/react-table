import React, { useEffect } from "react";
import useInput from "../hooks/useInput";
import styles from '../styles/TextField.module.scss';
import { FaTimes } from 'react-icons/fa';

export default function TextField({
    getValue,
    placeholder,
}: {
    getValue: Function,
    placeholder: string,
}) {
    const input = useInput();
    const classes = [styles.textField];

    useEffect(() => {
        getValue(input.value());
    }, [input.value()])

    return (
        <div className={classes.join(" ")}>
            <input
                placeholder={placeholder}
                className={styles.textField__input}
                {...input.bind}
                type="text"
            />
            <button
                className={styles.textField__clear}
                onClick={() => input.clear()}
            >
                <FaTimes />
            </button>
        </div>
    )
}