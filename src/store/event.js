export default {
    state: {
        events: [],
    },
    mutations: {
        setEvents(state, payload) {
            state.events = payload
        },
    },
    actions: {},
    getters: {
        events(state) {
            return state.events
        }
    }
}