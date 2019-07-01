import userService from "@/services/user-service";
import { router } from '@/router';


const userToken = localStorage.getItem('userToken');
const user = JSON.parse(localStorage.getItem('user'));

export default {
    state: {
        userToken: userToken,
        user: user
    },
    mutations: {
        setToken(state, token) {
            state.userToken = token
        },
        setUser(state, user) {
            state.user = user
        },
        logoutUser(state) {
            state.userToken = '';
            state.user = ''
        }
    },
    actions: {
        login({dispatch, commit},{username, password}) {

            userService.login(username, password)
                .then(
                    token => {
                        commit('setToken', token);
                        return dispatch('setUser');
                    }
                )
                .then(() => router.push('/topics')
                )
        },

        logout({commit}) {
          return userService.logout()
              .then(() => {
                  commit('logoutUser');
                  location.reload(true);
              })
        },

        setUser({commit}) {
            //Get user from API and set to store and to localStorage
            return userService.getUser()
                .then(response => {
                    localStorage.setItem('user', JSON.stringify(response.data));
                    commit('setUser', response.data)
                    }
                )
        }
    },
    getters: {
        user(state) {
            return state.user
        }
    }
}
