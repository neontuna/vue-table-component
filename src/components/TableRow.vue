<template>
    <tr :class="[
            row.data[activeFieldName] === activeId ? activeClass : '', 
            showEdit ? 'pointer-enabled': '',
            value.includes(row.data.id) ? 'warning' : ''
            ]" 
        @click.prevent="checkRow()">
        <td v-if="showEdit">
            <div class="ui checkbox">
                <input ref="rowCheckbox" type="checkbox" v-model="internalValue" :value="row.data.id" @click.stop="">
                <label>&nbsp;</label>
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
        methods: {
            checkRow() {
                if (this.showEdit) {
                     if (this.$refs.rowCheckbox.checked) {
                        let index = this.value.indexOf(this.row.data.id)
                        let emitValue = this.value.slice()
                        emitValue.splice(index, 1)

                        this.$emit("input", emitValue)
                     } else {
                        let emitValue = this.value.slice()
                        emitValue.push(this.row.data.id)

                        this.$emit("input", emitValue)
                     }
                }
            }
        }
    };
</script>

<style scoped>
    .pointer-enabled {
        cursor: pointer;
    }
</style>