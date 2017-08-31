import pick from 'lodash/pick';

export default class Column {
    constructor(columnComponent) {
        const properties = pick(columnComponent, [
            'show', 'label', 'dataType', 'sortable', 'sortBy', 'filterable',
            'filterOn', 'hidden', 'formatter', 'cellClass', 'headerClass', 'nullText',
        ]);

        for (const property in properties) {
            this[property] = columnComponent[property];
        }

        this.template = columnComponent.$scopedSlots.default;
    }


    isFilterable() {
        return this.filterable;
    }

    getFilterFieldName() {
        return this.filterOn || this.show;
    }

    isSortable() {
        return this.sortable;
    }

    getSortPredicate(sortOrder, allColumns, secondarySortField) {
        const sortFieldName = this.getSortFieldName();

        const sortColumn = allColumns.find(column => column.show === sortFieldName);

        const dataType = sortColumn.dataType;

        if (dataType.startsWith('date') || dataType === 'numeric') {

            return (row1, row2) => {
                const value1 = row1.getSortableValue(sortFieldName);
                const value2 = row2.getSortableValue(sortFieldName);

                // secondary sort
                if (!(value1 > value2 || value1 < value2)) {
                    const sValue1 = row1.getSortableValue(secondarySortField);
                    const sValue2 = row2.getSortableValue(secondarySortField);   

                    return sValue1.localeCompare(sValue2);     
                }

                if (sortOrder === 'desc') {
                    return value2 < value1 ? -1 : 1;
                }

                return value1 < value2 ? -1 : 1;
            };
        }

        return (row1, row2) => {
            const value1 = row1.getSortableValue(sortFieldName);
            const value2 = row2.getSortableValue(sortFieldName);

            // secondary sort
            if (!(value2.localeCompare(value1) || value1.localeCompare(value2))) {
                const sValue1 = row1.getSortableValue(sortFieldName);
                const sValue2 = row2.getSortableValue(sortFieldName);

                return sValue1.localeCompare(sValue2);
            }

            if (sortOrder === 'desc') {
                return value2.localeCompare(value1);
            }

            return value1.localeCompare(value2);
        };
    }

    getSortFieldName() {
        return this.sortBy || this.show;
    }
}
