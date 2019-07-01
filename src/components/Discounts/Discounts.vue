<template>
  <v-container wrap>
    <!--button for my discount-catalogs-->
    <v-btn
            color="pink"
            style="margin-top: 60px"
            dark
            small
            fixed
            top
            right
            fab
            :to="{name: 'my-discount-catalogs'}"
    >
      <v-icon>person</v-icon>
    </v-btn>

    <create-discount-catalog></create-discount-catalog>

    <v-layout v-for="(value, propertyName) in catalogsByCategories"
              :key="propertyName" class="mb-4">
      <div>
        <div class="pb-1">{{ propertyName }}</div>
        <v-layout row>
        <v-hover v-for="item in value"
                  :key="item.id">
          <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  width="344"
                  class="mr-3"
          >
            <v-img
                    :aspect-ratio="16/9"
                    :src="item.image"
            ></v-img>
            <v-card-title>
              <div>
                <span class="headline">{{ item.name }}</span>
                <div class="d-flex">
                  <div class="ml-2 grey--text text--darken-2">
                    <span>Discounts: {{ item.discounts_count}}</span>
                  </div>
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-btn icon class="mr-0">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
        </v-hover>
        </v-layout>
      </div>
      </v-layout>

  </v-container>
</template>

<script>
    import CreateDiscountCatalog from "./CreateDiscountCatalog"

    export default {

        data() {
            return {}
        },
        components: {
            CreateDiscountCatalog
        },
        created() {
            this.fetchData()
        },
        watch: {
            // при изменениях маршрута запрашиваем данные снова
            '$route': 'fetchData'
        },
        computed: {
            catalogsByCategories() {
                return this.$store.getters.discountCatalogsByCategories
            }
        },
        methods: {
            fetchData() {
                this.$http
                    .get('/discount-catalogs/by_categories/')
                    .then(response => (this.$store.dispatch('groupDiscountCatalogsByCategories', response.data)));
            },
        }
    }
</script>

<style scoped>

</style>