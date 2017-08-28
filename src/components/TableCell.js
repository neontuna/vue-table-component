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

        if (props.column.dataType.startsWith('date')) {
            const format  = props.column.dataType.replace('date:', '');
            
            // datetime HAS to be in ISO8601 format.  Could look for "z" at the end of the date
            // or some other indicator that moment.utc shouldn't be used but hey we forked this
            // for a reason, right :)
            data.domProps.innerHTML = moment.utc(props.row.getValue(props.column.show)).format(format);                 
        } else {
            data.domProps.innerHTML = props.column.formatter(props.row.getValue(props.column.show), props.row.data);
        }

        return createElement('td', data);
    },
};
