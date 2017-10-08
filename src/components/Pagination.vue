<template>
    <nav v-if="shouldShowPagination">
        <div class="ui centered pagination menu">
            <a 
                class="icon item" 
                :class="{ disabled: pagination.currentPage === 1 }" 
                @click="pageClicked( pagination.currentPage - 1 )">
                <i class="left chevron icon"></i>
            </a>            
            <a 
                class="item" 
                :class="{ active: isActive(page) }" 
                v-for="page in pages"
                @click="pageClicked(page)" >
                {{ page }}
            </a>
            <a 
                class="icon item" 
                :class="{ disabled: pagination.currentPage === pages.length }" 
                @click="pageClicked( pagination.currentPage + 1 )">
                <i class="right chevron icon"></i>
            </a>                
        </div>
    </nav>
</template>

<script>
    import range from 'lodash/range';

    export default {
        props: {
            pagination: {
                type: Object,
                default: () => ({}),
            },
        },

        computed: {
            pages() {
                return this.pagination.totalPages === undefined
                    ? []
                    : range(1, this.pagination.totalPages + 1);
            },

            shouldShowPagination() {
                if (this.pagination.totalPages === undefined) {
                    return false;
                }

                if (this.pagination.count === 0) {
                    return false;
                }

                return this.pagination.totalPages > 1;
            },
        },

        methods: {
            isActive(page) {
                const currentPage = this.pagination.currentPage || 1;

                return currentPage === page;
            },

            pageClicked(page) {
                if (this.pagination.currentPage === page || 
                    this.pages.length < page ||
                    page < 1) {
                    return;
                }

                this.$emit('pageChange', page);
            },
        },
    };
</script>

<style>
    .ui.pagination.menu {
        margin-top: 10px;
    }
</style>
