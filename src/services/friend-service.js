import axios from 'axios';

const RESOURCE_NAME = '/friends';

export default {
    getList() {
        return axios.get(`${RESOURCE_NAME}/?limit=50`)
    },
    removeFromFriend(friendId) {
        return axios.delete(`${RESOURCE_NAME}/${friendId}/delete/`)
    }
}