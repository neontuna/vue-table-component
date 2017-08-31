import moment from 'moment';

export default {
    functional: true,

    props: ['column', 'row'],

    render(createElement, { props }) {
        const data = {};

        if (props.column.cellClass) {
            data.class = props.column.cellClass;
        }

        if (props.column.template) {
            return createElement('td', data, props.column.template(props.row.data));
        }

        data.domProps = {};

        if (props.column.dataType.startsWith('date') && props.row.getValue(props.column.show)) {
            const format  = props.column.dataType.replace('date:', '');
            
            // datetime HAS to be in ISO8601 format.  Will likely need to revisit
            // this once time zones other than EST are being used
            data.domProps.innerHTML = moment(props.row.getValue(props.column.show)).format(format);                 
        } else {
            data.domProps.innerHTML = props.column.formatter(props.row.getValue(props.column.show), props.row.data);
        }

        return createElement('td', data);
    },
};
