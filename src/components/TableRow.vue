<template>
    <tbody>    
        <tr :class="row.data[activeFieldName] === activeId ? activeClass : ''">
            <table-cell
                v-for="column in visibleColumns"
                :row="row"
                :column="column"
            ></table-cell>
        </tr>
        <slot name="parentextrarow">
            
        </slot>
    </tbody>
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
