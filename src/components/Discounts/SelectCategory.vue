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
    import discountCategoryService from '../../services/discount-category-service'

    export default {
        props: {
            selected: {
                default: null
            },
            parentCategory: {
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
        watch: {
            search(val) {
                val && val !== this.select && this.searchCategoryOnApi(val)
            },
            parentCategory() {
                this.fetchData()
            },
        },
        methods: {
            fetchData() {
                let response;
                if (this.parentCategory) {
                    response = discountCategoryService.getSubCategoriesByParentId(this.parentCategory)
                } else {
                    response = discountCategoryService.getOnlyTop()
                }
                response.then(response => this.categories = response.data);
            },
            searchCategoryOnApi(v) {
                let response;
                this.loading = true;

                if (this.parentCategory) {
                    response = discountCategoryService.searchInSubCategories(this.parentCategory, v)
                } else {
                    response = discountCategoryService.searchInTop(v)
                }

                response
                    .then(response => this.categories = response.data)
                    .finally(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>