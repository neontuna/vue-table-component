import Vue from 'vue';
import axios from 'axios';
import { TableColumn, TableComponent } from '../src';

new Vue({
    el: '#app',

    components: {
        TableColumn,
        TableComponent,
    },
    data() {
        return {
            showEdit: true,
            checkedRows: [],
        };
    },
    methods: {
        async tableData({ page, filter, sort }) {
            const params = {};

            if (sort && Object.keys(sort).length) {
                const orderKeys = { 'desc': '-', 'asc': '' };
                const order = orderKeys[sort.order];
                params.sort = `${order}${sort.fieldName}`;
            }

            if (page) {
                params.page = page;
            }

            const config = {
                params: params,
                headers: {
                    'Authorization': `Token token=${process.env.DEV_TOKEN}`,
                },
            };
          
            const res = await axios.get('http://localhost:3000/api/v1/tickets', config);

            const currentPage = Number(res.headers['page']);
            const totalPages = Math.ceil(res.headers['total'] / res.headers['per-page']);

            return {
                data: res.data,
                pagination: {
                    currentPage: currentPage,
                    totalPages: totalPages,
                },
            };                    
        },
    },
});
