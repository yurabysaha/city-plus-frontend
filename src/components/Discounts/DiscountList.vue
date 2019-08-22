<template>
    <v-layout row wrap>
<create-discount></create-discount>
        <div v-for="item in discounts.results"
             :key="item.id">
            <v-badge
                    :color="item.is_published ? 'green' : 'red'"
                    right
                    overlap
            >
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
                                        <span>Discount: {{ item.percent_discount}} %</span>
                                    </div>
                                </div>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn @click.stop="openEditModal(item.id)" icon class="mr-0 ml-0">
                                <v-icon dark small> edit</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card>
                </v-hover>
            </v-badge>
        </div>
        <no-items :text="'This catalog does not have any discounts yet'" v-if="!discounts.count"></no-items>
    </v-layout>
</template>

<script>
    import discountCatalogService from '@/services/discount-catalog-service'
    import NoItems from "@/components/Shared/NoItems"
    import CreateDiscount from "./CreateDiscount";


    export default {
        components: {
            NoItems,
            CreateDiscount,
        },
        props: ['catalogId'],
        data() {
          return {
              discounts: null,
              items: [
                  {
                      text: 'Dashboard',
                      disabled: false,
                      href: 'breadcrumbs_dashboard'
                  },
                  {
                      text: 'Link 1',
                      disabled: false,
                      href: 'breadcrumbs_link_1'
                  },
                  {
                      text: 'Link 2',
                      disabled: true,
                      href: 'breadcrumbs_link_2'
                  }
              ]
          }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                discountCatalogService.getDiscountsForCatalogbyId(this.$route.params.catalog_id)
                    .then(response => this.discounts = response.data)
            }
        }
    }
</script>

<style scoped>

</style>