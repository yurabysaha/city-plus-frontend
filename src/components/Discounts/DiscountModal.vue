<template>
    <div>
        <v-btn v-if="action === 'create'"
               color="pink"
               dark
               fixed
               bottom
               right
               fab
               @click="dialog = !dialog"
        >
            <v-icon>add</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title
                        class="headline"
                        primary-title
                >
                    {{ discountId ? 'Edit Discount': 'Create new Discount' }}
                </v-card-title>

                <v-card-text>
                    <v-text-field v-model="discount.name" label="Discount name"></v-text-field>
                    <v-text-field v-model="discount.description" label="Discount description"></v-text-field>
                    <v-text-field v-model="discount.old_price" label="Old price"></v-text-field>
                    <v-text-field v-model="discount.new_price" label="New price"></v-text-field>
                    <v-text-field v-model="discount.percent_discount" label="Discount percent"></v-text-field>

                    <select-category
                            :parent-category="catalog.category"
                            :selected="discount.category"
                            @selected="discount.category = $event"
                    >
                    </select-category>

                    <!-- Start Date Dialog -->
                    <v-dialog
                            ref="start_date"
                            v-model="modal_start_date"
                            :return-value.sync="discount.start_date"
                            persistent
                            lazy
                            full-width
                            width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="discount.start_date"
                                    label="Start Date"
                                    prepend-icon="event"
                                    v-on="on"
                                    readonly
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="discount.start_date"
                                scrollable
                        >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal_start_date = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.start_date.save(discount.start_date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <!-- End Date Dialog -->
                    <v-dialog
                            ref="dialog"
                            v-model="modal_end_date"
                            :return-value.sync="discount.end_date"
                            persistent
                            lazy
                            full-width
                            width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    v-model="discount.end_date"
                                    label="End Date"
                                    prepend-icon="event"
                                    readonly
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="discount.end_date"
                                scrollable
                        >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal_end_date = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(discount.end_date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>

                    <v-btn flat icon @click="$refs.inputUpload.click()">
                        <v-icon>attach_file</v-icon>
                    </v-btn>
                    <span>{{imageName ? imageName : 'Select Image'}}</span>
                    <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked">
                    <v-img :src="imageUrl ? imageUrl : discount.image"></v-img>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="discountId" flat color="primary" @click="updateDiscount">UPDATE</v-btn>
                    <v-btn v-else flat color="primary" @click="createDiscount">CREATE</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
    import SelectCategory from "./SelectCategory"
    import discountService from "../../services/discount-service"
    import discountCatalogService from "../../services/discount-catalog-service";

    export default {
        props: {
            discountId: {
                default: null
            },
            action: {
                default: 'create'
            },
        },
        data() {
            return {
                discount: {},
                catalog: {},
                dialog: false,
                modal_start_date: false,
                modal_end_date: false,
                imageName: '',
                imageUrl: undefined,
                imageFile: undefined,
            }
        },
        components: {
            SelectCategory,
        },
        created() {
            this.fetchData()
        },
        watch: {
            dialog() {
                if (!this.dialog) {
                    this.$emit('dialog-closed')
                }
            },
            discountId() {
                if (this.discountId) {
                    this.fetchData();
                    this.dialog = true
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
                    this.imageFile = undefined;
                    this.imageUrl = undefined;
                }
            },
            createDiscount() {
                let formData = new FormData();

                for (let key in this.discount) {
                    formData.append(key, this.discount[key]);
                }
                formData.set('start_date', new Date(this.discount['end_date']).toISOString());
                formData.set('end_date', new Date(this.discount['end_date']).toISOString());
                formData.set('catalog', this.catalog.id);

                if (this.imageFile) {
                    formData.append('image', this.imageFile);
                }
                discountService.create(formData)
                    .then(() => {
                        this.imageName = '';
                        this.imageFile = undefined;
                        this.imageUrl = undefined;
                        this.$emit("discount-created")
                    });
                this.dialog = false;
            },
            updateDiscount() {
                let formData = new FormData();

                for (let key in this.discount) {
                    if (key !== 'image' && this.discount[key]) {
                        formData.append(key, this.discount[key]);
                    }
                }
                formData.set('start_date', new Date(this.discount['end_date']).toISOString());
                formData.set('end_date', new Date(this.discount['end_date']).toISOString());

                if (this.imageFile) {
                    formData.set('image', this.imageFile);
                }

                discountService.updateById(this.discount.id, formData)
                    .then(() => {
                        this.imageName = '';
                        this.imageFile = undefined;
                        this.imageUrl = undefined;
                        this.$emit("discount-created");
                    });
                this.dialog = false;
            },
            fetchData() {
                if (this.discountId) {
                    discountService.getById(this.discountId)
                        .then(response => (this.discount = response.data));
                }
                discountCatalogService.getCatalogById(this.$route.params.catalog_id)
                    .then(response => (this.catalog = response.data));
            },
        }
    }
</script>

<style scoped>

</style>