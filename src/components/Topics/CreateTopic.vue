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
            Create new Topic
          </v-card-title>
            <v-card-text>
                <v-text-field v-model="title" label="Title"></v-text-field>
                <v-text-field v-model="description" label="Description"></v-text-field>
                <v-btn flat icon @click="$refs.inputUpload.click()"><v-icon>attach_file</v-icon></v-btn><span>{{imageName ? imageName : 'Select Image'}}</span>
                <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked" >
              <v-img :src="imageUrl"></v-img>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="createTopic">CREATE</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</div>
</template>

<script>
    import topicService from "@/services/topic-service";

    export default {
        data () {
            return {
                dialog: false,
                title: '',
                description: '',
                imageName: '',
                imageUrl: '',
                imageFile: '',
            }
        },
        methods: {
            onFilePicked (e) {
                const files = e.target.files;
                if(files[0] !== undefined) {
                    this.imageName = files[0].name;
                    if(this.imageName.lastIndexOf('.') <= 0) {
                        return
                    }

                    const fr = new FileReader ();
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
            createTopic() {

                let topicData = {
                    name: this.title,
                    description: this.description
                };

                this.dialog = false;

                topicService.create(topicData)
                    .then(response => {
                        this.topicObj = response.data;
                        this.title = '';
                        this.description = '';

                        if (this.imageFile !== '') {
                            let formData = new FormData();
                            formData.append('image', this.imageFile);
                            topicService.addPhoto(this.topicObj.id, formData)
                                .then(response => {
                                    this.imageName = '';
                                    this.imageFile = '';
                                    this.imageUrl = '';
                                    this.$store.commit('addNewTopic', response.data)
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        } else {
                            this.$store.commit('addNewTopic', this.topicObj);
                        }
                        }).catch(function (error) {
                            console.log(error);
                        });
            },
        }
    }
</script>

<style scoped>

</style>