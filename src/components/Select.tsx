import React, { useState, useEffect } from "react";
import styles from '../styles/Select.module.scss';
import Option from '../interfaces/Option';
import { TiArrowSortedDown } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';

export default function Select({
    optionsValue,
    getSelectOption,
    title
}: {
    optionsValue: string[],
    getSelectOption: Function,
    title: string
}) {
    const [options, setOptions] = useState<Option[]>([]);
    const [selectTitle, setTitle] = useState<string>(title);
    const [open, setOpen] = useState(false);
    const classes = [styles.select__top];

    function selectOption(id: number) {
        options.map(option => {
            option.select = false;
            if (option.id === id) {
                option.select = true;
                setTitle(option.value);
                getSelectOption(option.value);
            }
            return option;
        })
        toggleOpen();
    }

    function toggleOpen(value?: boolean) {
        const nowState = open;
        setOpen(value ? value : !nowState);
    }

    function clearOptions() {
        setOptions(options.map(option => {
            option.select = false;
            return option;
        }))
        setTitle(title);
    }

    function init() {
        var id = 1;
        setOptions(optionsValue.map(value => {
            const option = {
                id,
                value,
                select: false,
            }
            id++;
            return option;
        }))
    }

    useEffect(() => {
        init();
    }, [null])

    return (
        <div className={styles.select}>
            <div
                onClick={() => toggleOpen()}
                className={
                    open ?
                        [...classes, styles.select__top_open].join(" ") :
                        classes.join(" ")
                }>
                {selectTitle}
                <TiArrowSortedDown />
            </div>
            {open && (
                <div className={styles.select__list}>
                    {options.map((option: Option, i: React.Key) => {
                        return <button className={styles.select__option} key={i} onClick={() => selectOption(option.id)} >{option.value}</button>
                    })}
                </div>
            )}
            <button
                onClick={() => clearOptions()}
                className={styles.select__clean}
            >
                <FaTimes />
            </button>
        </div>
    )
}