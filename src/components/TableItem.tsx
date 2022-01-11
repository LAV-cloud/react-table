import React from "react";
import styles from '../styles/Table.module.scss';

export default function TableItem({
    columns
}: {
    columns: string[] | number[]
}) {
    return (
        <tr className={styles.tableItem}>
            {columns.map((col: string | number, i: React.Key) => {
                return <td key={i} className={styles.tableItem__col}>{col}</td>
            })}
        </tr>
    )
}