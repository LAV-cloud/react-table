import React from "react";
import Page from "../interfaces/Page";
import styles from '../styles/Table.module.scss';

export default function TablePagination({
    pages,
    selectPage,
}: {
    pages: Page[] | never[],
    selectPage: Function,
}) {
    return (
        <div className={styles.tablePagination}>
            {pages.map((page, i: React.Key) => {
                return <button
                    className={
                        page.select ? [styles.tablePagination__page, styles.tablePagination__page_select].join(" ")
                            : styles.tablePagination__page
                    }
                    onClick={() => selectPage(page.id)}
                    key={i}
                >{page.id}</button>
            })}
        </div>
    )
}