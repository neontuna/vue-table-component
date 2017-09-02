<template>
    <tr :class="row.data[activeFieldName] === activeId ? activeClass : ''">
        <table-cell
            v-for="column in visibleColumns"
            :row="row"
            :column="column"
        ></table-cell>
    </tr>
</template>

<script>
    import TableCell from './TableCell';

    export default {
        props: ['columns', 'row', 'activeClass', 'activeFieldName', 'activeId'],

        components: {
            TableCell,
        },

        computed: {
            visibleColumns() {
                return this.columns.filter(column => ! column.hidden);
            },
        },
    };
</script>
