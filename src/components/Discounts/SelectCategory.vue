<template>
    <v-autocomplete
            :items="categories"
            :loading="loading"
            item-text="name"
            :value="selected"
            @change="$emit('selected', $event)"
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
            },
            parent: {
                default: null
            },
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
            '$route': 'fetchData',
            search(val) {
                val && val !== this.select && this.searchCategoryOnApi(val)
            }
        },
        methods: {
            fetchData() {
                const url = this.parent ?
                    `/discount-category/?is_top=${!!this.parent}&top=${this.parent}` :
                    `/discount-category/?is_top=${!!this.parent}`;
                this.$http
                    .get(url)
                    .then(response => this.categories = response.data);
            },
            searchCategoryOnApi(v) {
                this.loading = true;
                const url = this.parent ?
                    `/discount-category/?is_top=${!!this.parent}&top=${this.parent}` :
                    `/discount-category/?is_top=${!!this.parent}`;
                this.$http
                    .get(`${url}&name=${v}`)
                    .then(response => this.categories = response.data)
                    .finally(() => this.loading = false)
            }
        }
    }
</script>

<style scoped>

</style>