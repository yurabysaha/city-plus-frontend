import axios from 'axios';


export default {

    login(username, password) {
        return axios.post('accounts/login/', {username, password})
            .then(response => {
                // login successful if there's a token in the response
                if (response.data.key) {
                    // store user details and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('userToken', response.data.key);
                }
                return response.data.key;
            });
    },

    logout() {
        // remove user from local storage to log user out
        return axios.post('accounts/logout/')
            .then(() => {
                localStorage.removeItem('userToken');
                localStorage.removeItem('user');
            })
    },

    getUser() {
        return axios.get('accounts/profile/')
    },

    update(user) {
        return axios.put('accounts/profile/', user)
    },

    register(user) {
        return axios.post('accounts/registration/', user)
    },

    getUserById(userId) {
        return axios.get(`accounts/profile/${userId}/`)
    },
}