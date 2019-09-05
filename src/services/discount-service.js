import axios from 'axios';

const RESOURCE_NAME = '/discounts';

export default {

    create(catalogData) {
        return axios.post(`${RESOURCE_NAME}/`, catalogData,{ headers: { 'content-type': 'multipart/form-data' } })
    },

    updateById(discountId, data) {
        return axios.put(`${RESOURCE_NAME}/${discountId}/`, data,{ headers: { 'content-type': 'multipart/form-data' } })
    },

    getById(discountId) {
        return axios.get(`${RESOURCE_NAME}/${discountId}/`)
    },
}