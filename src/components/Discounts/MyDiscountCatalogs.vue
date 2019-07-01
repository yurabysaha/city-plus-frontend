<template>
  <v-layout row wrap>
    <div v-for="item in myDiscountCatalogs"
         :key="item.id">
      <v-badge
              :color="item.is_published ? 'green' : 'red'"
              right
              overlap
      >
      <template v-slot:badge>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on"
                    dark
                    small
            >
              {{item.is_published ? 'done' : 'clear'}}
            </v-icon>
          </template>
          <span>{{item.is_published ? 'Your Catalog already published!' : 'Your Catalog is not published yet!'}}</span>
        </v-tooltip>
      </template>
      <v-hover>

          <v-card
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
              width="344"
              class="ml-3 mb-3"
      >
        <v-img
                :aspect-ratio="16/9"
                :src="item.image"
        ></v-img>
        <v-card-title>
          <div>
            <span class="headline">{{ item.name | maxLength }}</span>
            <div class="d-flex">
              <div class="ml-2 grey--text text--darken-2">
                <span>Discounts: {{ item.discounts_count}}</span>
              </div>
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-btn icon class="mr-0 ml-0"> <v-icon dark small> edit </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-hover>

    </v-badge>

    </div>
  </v-layout>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        computed: {
            myDiscountCatalogs() {
                return this.$store.getters.myDiscountCatalogs
            }
        },
        methods: {
            fetchData() {
                this.$http
                    .get('/discount-catalogs/my/')
                    .then(response => (this.$store.dispatch('setMyDiscountCatalogs', response.data.results)));
            },
        },
        filters: {
            maxLength(value) {
                if (value.length > 20) { return value.substring(0, 20) + '...'; }
                return value;
            }
        }
    }
</script>

<style scoped>

</style>