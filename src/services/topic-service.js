import axios from 'axios';

const RESOURCE_NAME = '/topic';

export default {
    getList() {
        return axios.get(`${RESOURCE_NAME}/?limit=5`)
    },

    create(topicData) {
        return axios.post(`${RESOURCE_NAME}/`, topicData)
    },

    addPhoto(topicId, formData) {
        return axios.post(`${RESOURCE_NAME}/${topicId}/add_photo/`, formData, { headers: { 'content-type': 'multipart/form-data' } })
    },

    setLike(topicId) {
        return axios.get(`${RESOURCE_NAME}/${topicId}/like/`)
    },

    removeLike(topicId) {
        return axios.delete(`${RESOURCE_NAME}/${topicId}/like/`)
    },

    delete(topicId) {
        return axios.delete(`${RESOURCE_NAME}/${topicId}/`)
    },
}