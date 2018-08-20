<template>
    <tr :class="row.data[activeFieldName] === activeId ? activeClass : ''">
        <td v-if="showEdit">
            <div class="ui checkbox">
                <input type="checkbox" v-model="internalValue" :value="row.data.id">
            </div>
        </td>
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
        props: ['columns', 'row', 'activeClass', 'activeFieldName', 'activeId', 'showEdit', 'value' ],

        components: {
            TableCell,
        },

        computed: {
            visibleColumns() {
                return this.columns.filter(column => ! column.hidden);
            },
            internalValue: {
                get() { return this.value },
                set(selectedId) { this.$emit("input", selectedId) }
            },
        },
    };
</script>
