import React, { useState, useEffect } from "react";
import styles from '../styles/Table.module.scss';
import TableHeader from "./TableHeader";
import TableItem from "./TableItem";
import Page from "../interfaces/Page";
import Item from '../interfaces/Item';
import TablePagination from "./TablePagination";
import TableSort from "./TableSort";

//  Для функции getItemsProps
enum ObjectMethod {
    keys = "keys",
    values = "values",
}

export default function Table({
    pagination,
    maxCount = 10,
    data
}: {
    pagination?: boolean,
    maxCount?: number,
    data: Item[],
}) {
    var [tableData, setTableData] = useState<Item[]>([]);
    var [pages, setPages] = useState<Page[]>([]);
    var [selectedPage, setSelectedPage] = useState<Page>();

    // "set"
    function getPages(data: Item[]) {
        const pageArr: Page[] = [];
        var itemsArr: Item[] = [];
        var pageId = 0;
        data.map((item: Item, i: number) => {
            if (i % maxCount === 0) {
                if (pageId > 0) {
                    pageArr.push(createPage(pageId, itemsArr));
                }
                pageId++;
                if (itemsArr.length > 0) itemsArr = [];
            }
            itemsArr.push(item);
            if (i === data.length - 1) {
                pageArr.push(createPage(pageId, itemsArr));
            }
            return item;
        })
        setPages(pages = [...pageArr]);
        selectPage(1);
    }

    function createPage(id: number, data: Item[]) {
        const page = {
            id,
            data,
            select: false,
        }
        return page;
    }

    function selectPage(id: number) {
        setPages(pages.map(page => {
            page.select = false;
            if (page.id === id) page.select = true;
            return page;
        }))
        setSelectedPage(pages.filter(page => page.id === id)[0]);
    }

    //  Дает возможность взять все ключи или все значения из объектов массива
    //  Without добавил для того чтобы исключить id и date
    //  id убрал т.к. в задании ничего про него нету   date т.к. сортировка/фильтрация должна проходить без неё
    function getItemProps(obj: Item, data: Item[], method: ObjectMethod, withOut?: number[]) {
        const items = [];
        if (data.length > 0) {
            let i = 0;
            for (let value of Object[method](obj)) {
                var flag = 0;
                i++;
                withOut?.map(out => {
                    if (out === i) flag = 1;
                    return out;
                })
                if (!flag) items.push(value);
            }
        }
        return items;
    }

    //  Обновление таблицы (при сортировки)
    function updateData(data: Item[]) {
        setTableData(tableData = [...data]);
        if (pagination) getPages(data);
    }

    useEffect(() => {
        if (data.length > 0) updateData(data);
    }, [data])

    return (
        <div className={styles.table}>
            <TableSort getSortingData={(data: Item[]) => updateData(data)} data={data} />
            <div className={styles.table__scrollSupport}>
                <table>
                    <thead className={styles.table__head}>
                        <TableHeader headerItems={getItemProps(data[0], data, ObjectMethod.keys, [1])} />
                    </thead>
                    {tableData.length > 0 ? (
                        <tbody className={styles.table__body}>
                            {pagination ? (
                                selectedPage?.data.map((item: any, i: React.Key) => {
                                    return <TableItem key={i} columns={getItemProps(item, tableData, ObjectMethod.values, [1])} />
                                })
                            ) : (
                                tableData.map((item: any, i: React.Key) => {
                                    return <TableItem columns={getItemProps(item, tableData, ObjectMethod.values, [1])} key={i} />
                                })
                            )}
                        </tbody>
                    ) : (
                        <div className={styles.table__notFound}>Not found!</div>
                    )}
                </table>
            </div>
            {pagination && <TablePagination selectPage={selectPage} pages={pages} />}
        </div>
    )
}