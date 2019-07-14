<template>
    <v-autocomplete
            :items="categories"
            :loading="loading"
            item-text="name"
            v-model="selected"
            @change="$emit('selected', selected)"
            item-value="id"
            label="Category"
            placeholder="Start typing to Search"
            :search-input.sync="search"
    ></v-autocomplete>
</template>

<script>
    export default {
        props: {
            selected: {
                default: null
            }
        },
        data() {
            return {
                categories: [],
                search: null,
                loading: false,
            }
        },

        created() {
            this.fetchData()
        },
        watch: {
            // при изменениях маршрута запрашиваем данные снова
            '$route': 'fetchData',
            search(val) {
                val && val !== this.select && this.searchCategoryOnApi(val)
            }
        },
        methods: {
            fetchData() {
                this.$http
                    .get('/discount-category/?is_top=true')
                    .then(response => this.categories = response.data);
            },
            searchCategoryOnApi(v) {
                this.loading = true;
                this.$http
                    .get(`/discount-category/?is_top=true&name=${v}`)
                    .then(response => this.categories = response.data)
                    .finally(() => this.loading = false)
            }
        }
    }
</script>

<style scoped>

</style>