export default {
    state: {
        discountCatalogsByCategories: [],
        myDiscountCatalogs: [],
    },
    mutations: {
        setDiscountCatalogsByCategories(state, payload) {
            state.discountCatalogsByCategories = payload
        },
        setMyDiscountCatalogs(state, payload) {
            state.myDiscountCatalogs = payload
        },
    },
    actions: {
        groupDiscountCatalogsByCategories({commit}, payload) {
            let discountCatalogsByCategories = {};
            for (let i = 0; i < payload.length; i++) {
                if (payload[i].category_name in discountCatalogsByCategories) {
                    discountCatalogsByCategories[payload[i].category_name].push(payload[i])
                } else {
                    discountCatalogsByCategories[payload[i].category_name] = [payload[i]]
                }
            }
            commit('setDiscountCatalogsByCategories', discountCatalogsByCategories)
        },
        setMyDiscountCatalogs({commit}, payload) {
            commit('setMyDiscountCatalogs', payload)

        }
    },
    getters: {
        discountCatalogsByCategories(state) {
            return state.discountCatalogsByCategories
        },
        myDiscountCatalogs(state) {
            return state.myDiscountCatalogs
        },
    }
}