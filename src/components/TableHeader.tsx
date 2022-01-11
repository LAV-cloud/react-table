import React from "react";
import styles from '../styles/Table.module.scss';

export default function TableHeader({
    headerItems
}: {
    headerItems: string[]
}) {
    return (
        <tr className={styles.tableHeader}>
            {headerItems.map((item: string, i: React.Key) => {
                return <td className={styles.tableHeader__item} key={i}>{item}</td>
            })}
        </tr>
    )
}