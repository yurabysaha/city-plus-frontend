<template>
  <v-autocomplete
          :items="places"
          :loading="loading"
          v-model="selected"
          @change="$emit('selected', selected)"
          item-text="name"
          item-value="id"
          label="Place"
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
                places: [],
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
            search (val) {
                val && val !== this.select && this.searchPlaceOnApi(val)
            }
        },
        methods: {
            fetchData() {
                this.$http
                    .get('/place/')
                    .then(response => this.places = response.data.results);
            },
            searchPlaceOnApi (v) {
                this.loading = true;
                this.$http
                    .get(`/place/?name=${v}`)
                    .then(response => this.places = response.data.results)
                    .finally(()=>this.loading = false)
            }
        }
    }
</script>

<style scoped>

</style>