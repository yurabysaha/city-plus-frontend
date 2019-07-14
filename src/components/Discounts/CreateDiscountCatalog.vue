<template>
  <div>
    <v-btn
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
          Create new Catalog
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="name" label="Catalog name"></v-text-field>
          <select-place v-on:selected="selectedPlace = $event"></select-place>
          <select-category v-on:selected="selectedCategory = $event"></select-category>
          <v-btn flat icon @click="$refs.inputUpload.click()"><v-icon>attach_file</v-icon></v-btn><span>{{imageName ? imageName : 'Select Image'}}</span>
          <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked" >
          <v-img :src="imageUrl"></v-img>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="createDiscountCatalog">CREATE</v-btn>
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
        data() {
            return {
                dialog: false,
                name: '',
                imageName: '',
                imageUrl: '',
                imageFile: '',
                selectedPlace: null,
                selectedCategory: null
            }
        },
        components: {
            SelectPlace,
            SelectCategory,
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
            createDiscountCatalog() {
                let formData = new FormData();

                this.dialog = false;

                formData.append('image', this.imageFile);
                formData.append('name', this.name);
                formData.append('category', this.selectedCategory);
                formData.append('place', this.selectedPlace);

                discountCatalogService.create(formData)
                    .then(() => {
                        this.name = '';
                        this.selectedCategory = null;
                        this.selectedPlace = null;
                        this.imageName = '';
                        this.imageFile = '';
                        this.imageUrl = '';
                        this.$emit("catalog-created")
                    })
            },
        }
    }
</script>

<style scoped>

</style>