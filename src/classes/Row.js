import moment from 'moment';
import get from 'lodash/get';

export default class Row {
    constructor(data, columns) {
        this.data = data;
        this.columns = columns;
    }

    getValue(columnName) {
        return get(this.data, columnName);
    }

    getColumn(columnName) {
        return this.columns.find(column => column.show === columnName);
    }

    getFilterableValue(columnName) {
        const value = this.getValue(columnName);

        if (! value) {
            return '';
        }

        return value.toString().toLowerCase();
    }

    getSortableValue(columnName) {
        const dataType = this.getColumn(columnName).dataType;

        let value = this.getValue(columnName);

        if (! value) {
            // dirty hack so we don't need to override sort method to
            // put nulls at the end
            return 'ZZZZ';
        }

        if (value instanceof String) {
            value = value.toLowerCase();
        }

        if (dataType.startsWith('date')) {
            const format  = dataType.replace('date:', '');

            return moment(value, format).format('YYYYMMDDHHmmss');
        }

        if (dataType === 'numeric') {
            return value;
        }

        return value.toString();
    }

    passesFilter(filter) {
        return this.columns
            .filter(column => column.isFilterable())
            .map(column => this.getFilterableValue(column.getFilterFieldName()))
            .filter(filterableValue => filterableValue.includes(filter.toLowerCase()))
            .length;
    }
}
