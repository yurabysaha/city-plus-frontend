import axios from 'axios';

const RESOURCE_NAME = '/discount-catalogs';

export default {
    getDiscountCatalogsByCategories() {
        return axios.get(`${RESOURCE_NAME}/by_categories/`)
    },

    create(catalogData) {
        return axios.post(`${RESOURCE_NAME}/`, catalogData,{ headers: { 'content-type': 'multipart/form-data' } })
    },

    updateById(catalogId, catalogData) {
        return axios.put(`${RESOURCE_NAME}/${catalogId}/`, catalogData,{ headers: { 'content-type': 'multipart/form-data' } })
    },

    getCatalogById(catalogId) {
        return axios.get(`${RESOURCE_NAME}/${catalogId}/`)
    },

    getMy() {
        return axios.get(`${RESOURCE_NAME}/my/`)
    },
    getDiscountsForCatalogbyId(catalogId) {
        return axios.get(`${RESOURCE_NAME}/${catalogId}/discounts/`)
    },
}