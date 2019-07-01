export default {
    state: {
        topics: {
            results: []
        },
    },
    mutations: {
        setTopics(state, payload) {
            state.topics = payload
        },
        addNewTopic(state, payload) {
            state.topics.results.unshift(payload);
        },
        deleteTopic(state, topicId) {
            let item = state.topics.results.find(x => x.id === topicId);
            let index = state.topics.results.indexOf(item);
            if (index > -1){
                state.topics.results.splice(index, 1)
            }
        },
        changeLike(state, payload) {
            let item = state.topics.results.find(x => x.id === payload);
            if (item.liked_by_me === false) { item.likes_count += 1 } else { item.likes_count -= 1 }
            item.liked_by_me = !item.liked_by_me;
        },
        updateCommentCount(state, payload) {
            let item = state.topics.results.find(x => x.id === payload);
            item.comments_count += 1
        }
    },
    actions: {},
    getters: {
        topics(state) {
            return state.topics
        }
    }
}