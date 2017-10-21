import moment from 'moment';
import { get, isString } from 'lodash';

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

        // gross hack for numbers and strings, put nulls at the end
        // date seems to do this by default
        if (dataType === 'numeric' && ! value) {
            return 999999999999999999999999;
        } else if (! value) {
            return 'ZZZZ';
        }

        if (dataType === 'numeric' && isString(value)) {
            return Number(value);
        } else if (dataType === 'numeric') {
            return value;

        }

        if (dataType.startsWith('date')) {
            // const format  = dataType.replace('date:', '');

            // return moment(value, format).format('YYYYMMDDHHmmss');

            // assuming valid format is passed to date, aftertag will use ISO8601

            return moment(value).format('YYYYMMDDHHmmss');
        }                

        if (value instanceof String) {
            value = value.toLowerCase();
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
