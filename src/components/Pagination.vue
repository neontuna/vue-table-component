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
                :class="{ active: isActive(page), disabled: page === '...' }" 
                v-for="page in pageLinks"
                @click="pageClicked(page)" >
                {{ page }}
            </a>
            <a 
                class="icon item" 
                :class="{ disabled: pagination.currentPage === this.pagination.totalPages }" 
                @click="pageClicked( pagination.currentPage + 1 )">
                <i class="right chevron icon"></i>
            </a>                
        </div>
    </nav>
</template>

<script>
// TODO more edge case testing
    export default {
        props: {
            pagination: {
                type: Object,
                default: () => ({}),
            },
        },

        computed: {
            pageLinks() {
                if (this.pagination.totalPages === undefined) {
                    return [];
                }

                const arr = [];
                let preDots = false;
                let postDots = false;
                      
                for (let i = 1; i <= this.pagination.totalPages; i++) {
                    if (this.pagination.totalPages <= 8) {
                        arr.push(i);
                    } else {
                        if (i === 1) {
                            arr.push(i);
                      } else if (i === this.pagination.totalPages) {
                            arr.push(i);
                      } else if (
                            (i > this.pagination.currentPage - 2 && i < this.pagination.currentPage + 2) ||
                            (i < 5 && this.pagination.currentPage < 5) ||
                            (i > this.pagination.totalPages - 4 && this.pagination.currentPage > this.pagination.totalPages - 4)) {
                            arr.push(i);
                      } else if (i < this.pagination.currentPage && !preDots) {
                            arr.push('...');
                            preDots = true;
                      } else if (i > this.pagination.currentPage && !postDots) {
                            arr.push('...');
                            postDots = true;
                      }
                    }
                }  

                return arr;              
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
                if (page === '...' ||
                    page === this.pagination.currentPage || 
                    page > this.pagination.totalPages ||
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
