<template>
    <v-layout row wrap>

        <discount-catalog-modal
                @dialog-closed="dialogClosed"
                :catalogId="catalogId"
                :action="'edit'"
        >
        </discount-catalog-modal>

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
                            <v-btn @click.stop="openEditModal(item.id)" icon class="mr-0 ml-0">
                                <v-icon dark small> edit</v-icon>
                            </v-btn>
                        </v-card-title>
                    </v-card>
                </v-hover>

            </v-badge>

        </div>
    </v-layout>
</template>

<script>
    import discountCatalogService from "@/services/discount-catalog-service"
    import DiscountCatalogModal from "./DiscountCatalogModal";

    export default {
        components: {DiscountCatalogModal},
        data() {
            return {
                modalVisible: false,
                catalogId: null
            }
        },
        created() {
            this.fetchData();
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
                discountCatalogService.getMy()
                    .then(response => (this.$store.dispatch('setMyDiscountCatalogs', response.data.results)));
            },
            openEditModal(catalogId) {
                this.catalogId = catalogId;
                this.modalVisible = true
            },
            dialogClosed() {
                this.fetchData();
                this.modalVisible = false
            },
        },
        filters: {
            maxLength(value) {
                if (value.length > 20) {
                    return value.substring(0, 20) + '...';
                }
                return value;
            }
        }
    }
</script>

<style scoped>

</style>