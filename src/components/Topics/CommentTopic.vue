<template>
<layout>
  <!--Loading bar-->
  <div class="text-xs-center" v-show="showLoading" style="height: 50px;">
    <v-progress-circular
            :width="3"
            color="red"
            indeterminate
    ></v-progress-circular>
  </div>


  <v-container v-show="!showLoading">

    <v-flex xs12 sm8 md7>
      <v-layout>
        <v-btn flat icon @click="$refs.inputUpload.click()">
          <v-icon>attach_file</v-icon>
        </v-btn>
        <input v-show="false" ref="inputUpload" type="file" @change="onFilePicked">

        <v-text-field
            label="New comment"
            placeholder="Enter your text..."
            v-model="newComment"
            @keyup.enter="createComment"
        ></v-text-field>

        <v-btn flat icon @click="createComment">
          <v-icon>send</v-icon>
        </v-btn>
      </v-layout>
      <span>{{ imageName }}</span>
    </v-flex>

    <v-list two-line
            v-for="(item, index) in comments.results">

      <v-divider
          :key="item.text"
      ></v-divider>

      <v-list-tile
          :key="item.id"
          avatar
          @click=""
      >
        <v-list-tile-avatar>
          <img :src="item.user.photos ? item.user.photos[0].image : ''">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-html="item.user.first_name + ' ' + item.user.last_name"></v-list-tile-title>
          <span class="grey--text" v-html="item.text"></span>
        </v-list-tile-content>

        <v-badge overlap color="red">
          <span slot="badge">{{ item.likes_count }}</span>
          <v-btn icon flat color="purple" @click="likeUnlike(item.id)">
            <v-icon>{{item.liked_by_me ? 'favorite' : 'favorite_border' }}</v-icon>
          </v-btn>
        </v-badge>

      </v-list-tile>
      <v-img v-if="item.attach"
             max-height="400"
             :src="item.attach">
      </v-img>
    </v-list>
  </v-container>
</layout>
</template>

<script>
    import VContent from "vuetify/lib/components/VGrid/VContent";

    export default {
        components: {VContent},
        props: ['topicId'],
        data() {
            return {
                comments: [],
                newComment: '',
                imageName: '',
                imageUrl: '',
                imageFile: '',
                showLoading: true,
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {

                this.showLoading = true;
                this.$http
                    .get('topic/' + this.topicId + '/comments/')
                    .then(response => (this.comments = response.data))
                    .then(() => (this.showLoading = false))
                    .catch(error => console.log(error));
            },
            createComment() {
                let formData = new FormData();
                formData.append('attach', this.imageFile);
                formData.append('text', this.newComment);

                this.$http
                    .post('topic/' + this.topicId + '/comments/', formData, {
                        headers: {
                            ...authHeader(),
                            'content-type': 'multipart/form-data'
                        }
                    })
                    .then(response => {
                        this.comments.results.unshift(response.data);
                        this.newComment = '';
                        this.imageFile = '';
                        this.imageName = '';
                        this.imageUrl = '';
                        this.$store.commit('updateCommentCount', this.topicId)
                    })
                    .catch(error => console.log(error));

            },
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
            likeUnlike(itemId) {
                let item = this.comments.results.find(x => x.id === itemId);
                if (item.liked_by_me === false) {
                    this.$http
                        .get('topic/' + this.topicId + '/comments/' + itemId + '/like/')
                        .then(() => (item.likes_count += 1));
                } else {
                    this.$http
                        .delete('topic/' + this.topicId + '/comments/' + itemId + '/like/')
                        .then(() => (item.likes_count -= 1));
                }
                item.liked_by_me = !item.liked_by_me;
            },
        }
    }
</script>

<style scoped>

</style>