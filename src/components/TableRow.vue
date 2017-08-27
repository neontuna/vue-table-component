<template>
    <tr :class="row.id === activeId ? activeClass : ''">
        {{ row.id }}
        {{ activeId }}
        {{ activeClass }}
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
        props: ['columns', 'row', 'activeClass', 'activeId'],

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
