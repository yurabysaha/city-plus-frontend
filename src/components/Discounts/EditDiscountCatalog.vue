<template>
    <div v-if="catalog">

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title
                        class="headline"
                        primary-title
                >
                    Update Catalog
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="catalog.name" label="Catalog name"></v-text-field>
                    <select-place :selected="catalog.place" @selected="catalog.place = $event"></select-place>
                    <select-category :selected="catalog.category" @selected="catalog.category = $event"></select-category>
                    <v-btn flat icon @click="$refs.inputUpload.click()"><v-icon>attach_file</v-icon></v-btn><span>{{imageName ? imageName : 'Change Image'}}</span>
                    <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked" >
                    <v-img :src="imageUrl? imageUrl : catalog.image"></v-img>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="updateDiscountCatalog">UPDATE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import SelectPlace from "./SelectPlace"
    import SelectCategory from "./SelectCategory"
    import discountCatalogService from "@/services/discount-catalog-service"

    export default {
        props: ['catalogId'],

        data() {
            return {
                dialog: true,
                imageName: '',
                imageUrl: '',
                imageFile: '',
                catalog: null
            }
        },
        components: {
            SelectPlace,
            SelectCategory,
        },
        created() {
            this.fetchData()
        },
        watch: {
            dialog() {
                if(!this.dialog) {
                    this.$emit('dialog-closed')
                }
            }
        },
        methods: {
            onFilePicked(e) {
                const files = e.target.files;
                if (files[0] !== undefined) {
                    this.imageName = files[0].name;
                    if (this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }

                    const fr = new FileReader();
                    fr.readAsDataURL(files[0]);
                    fr.addEventListener('load', () => {
                        this.imageUrl = fr.result;
                        this.imageFile = files[0] // this is an image file that can be sent to server...
                    })
                } else {
                    this.imageName = '';
                    this.imageFile = '';
                    this.imageUrl = '';
                }
            },
            updateDiscountCatalog() {
                let formData = new FormData();

                for ( let key in this.catalog ) {
                    if(key !== 'image') {
                        formData.append(key, this.catalog[key]);
                    }
                }
                if (this.imageFile) {
                    formData.set('image', this.imageFile);
                }

                discountCatalogService.updateById(this.catalog.id, formData)
                    .then(() => {
                        this.imageName = '';
                        this.imageFile = '';
                        this.imageUrl = '';
                        this.dialog = false;
                    });
            },
            fetchData() {
                if (this.catalogId) {
                    discountCatalogService.getCatalogById(this.catalogId)
                        .then(response => (this.catalog = response.data));
                }

            },
        }
    }
</script>

<style scoped>

</style>