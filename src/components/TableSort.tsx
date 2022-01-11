import React, { useState, useEffect } from "react";
import Item from '../interfaces/Item';
import Select from "./Select";
import styles from '../styles/Table.module.scss';
import TextField from "./TextField";

//  Для удобства
enum Compare {
    equal = "equal",
    less = 'less',
    greater = 'greater',
    contains = 'contains',
}

export default function TableSort({
    data,
    getSortingData
}: {
    data: Item[],
    getSortingData: Function
}) {
    var [selectedColumn, setSelectedColumn] = useState<string>("");
    var [selectedCompare, setSelectedCompare] = useState<string>("");
    var [searchField, setSearchField] = useState<string>("");

    function sortingData(
        column: string,
        compare: string,
        textValue: string
    ) {
        if (column !== "" && compare !== "" && textValue !== "") {
            const sortData: Item[] = [];
            data.map(item => {
                if (compare === Compare.equal && compareEqual(item[column], textValue)) sortData.push(item);
                if (compare === Compare.less && compareLess(item[column], textValue)) sortData.push(item);
                if (compare === Compare.greater && compareGreater(item[column], textValue)) sortData.push(item);
                if (compare === Compare.contains && item[column].toString().indexOf(textValue) > -1) sortData.push(item);
                return item;
            })
            getSortingData(sortData);
        } else {
            //  Если одно из полей пустое возвращаем данные без фильтрации
            getSortingData(data);
        }
    }

    function compareEqual(value: string | number, textValue: string) {
        if (typeof value === 'number') return value === +textValue;
        return value === textValue;
    }

    function compareLess(value: string | number, textValue: string) {
        if (typeof value === 'number') return value < +textValue;
        return value < textValue;
    }

    function compareGreater(value: string | number, textValue: string) {
        if (typeof value === 'number') return value > +textValue;
        return value > textValue;
    }

    useEffect(() => {
        sortingData(selectedColumn, selectedCompare, searchField);
    }, [selectedColumn, selectedCompare, searchField])

    return (
        <div className={styles.tableSort}>
            <Select
                getSelectOption={(value: string) => setSelectedColumn(value)}
                optionsValue={["count", "distance", "name"]}
                title={"Select columns"}
            />
            <Select
                getSelectOption={(value: string) => setSelectedCompare(value)}
                optionsValue={["greater", "less", "equal", "contains"]}
                title={"Select compare"}
            />
            <TextField
                placeholder={"Search..."}
                getValue={(value: string) => setSearchField(value)}
            />
        </div>
    )
}