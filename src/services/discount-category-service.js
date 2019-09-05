import axios from 'axios';

const RESOURCE_NAME = '/discount-category';

export default {

    getOnlyTop() {
        return axios.get(`${RESOURCE_NAME}/?is_top=true`)
    },
    searchInTop(search) {
        return axios.get(`${RESOURCE_NAME}/?is_top=true&name=${search}`)
    },
    getSubCategoriesByParentId(parentId) {
        return axios.get(`${RESOURCE_NAME}/?is_top=false&top=${parentId}`)
    },
    searchInSubCategories(parentId, search) {
        return axios.get(`${RESOURCE_NAME}/?is_top=false&top=${parentId}&name=${search}`)
    },



}