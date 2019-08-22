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

        <discount-catalog-modal @catalog-created="fetchData"></discount-catalog-modal>

        <v-layout v-for="(value, propertyName) in catalogsByCategories"
                  :key="propertyName" class="mb-4 scrolling">
            <div>
                <div class="pb-1">{{ propertyName }}</div>
                <v-layout row>
                    <v-hover v-for="item in value"
                             :key="item.id">
                        <v-card
                                :to="{name: 'discounts-for-catalog', params: {catalog_id: item.id}}"
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
    import DiscountCatalogModal from "./DiscountCatalogModal"
    import discountCatalogService from "@/services/discount-catalog-service"

    export default {

        data() {
            return {}
        },
        components: {
            DiscountCatalogModal
        },
        created() {
            this.fetchData()
        },
        watch: {
            // при изменениях маршрута запрашиваем данные снова
            '$route': 'fetchData',
        },
        computed: {
            catalogsByCategories() {
                return this.$store.getters.discountCatalogsByCategories
            }
        },
        methods: {
            fetchData() {
                discountCatalogService.getDiscountCatalogsByCategories()
                    .then(response => (this.$store.dispatch('groupDiscountCatalogsByCategories', response.data)));
            },
        }
    }
</script>

<style scoped>
    .scrolling {
        overflow-x: auto;
    }

    .scrolling::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
        background-color: #F5F5F5;
    }

    .scrolling::-webkit-scrollbar {
        height: 5px;
        background-color: #F5F5F5;
    }

    .scrolling::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.76);
    }

</style>