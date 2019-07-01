<template>
  <v-container wrap>

    <!--Loading bar-->
    <div v-show="showLoading" class="topicLoadingBar">
      <v-progress-circular
              :width="3"
              :size="70"
              color="red"
              indeterminate
      ></v-progress-circular>
    </div>

    <v-layout row wrap v-show="!showLoading">

      <v-flex xs12 sm6 offset-sm3>

        <create-topic></create-topic>

        <v-card
                v-for="item in topics.results"
                :key="item.id">

          <v-list-tile
                  avatar
                  @click="">
            <v-list-tile-avatar v-if="item.user.photos && item.user.photos.length">
              <img :src="item.user.photos[0].image">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.user.first_name + ' ' + item.user.last_name }}
              </v-list-tile-title>
              <span class="caption font-weight-regular font-italic">{{ item.created_at }}</span>
            </v-list-tile-content>

            <v-list-tile-action v-if="item.user.id === $store.getters.user.user">
              <v-menu bottom left>
                <template v-slot:activator="{ on }">
                  <v-btn
                          icon
                          v-on="on"
                  >
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </template>

                <v-list >
                  <v-list-tile
                          v-for="btn in menuItems"
                          :key="btn.title"
                          @click="menuEvent(btn.name, item.id)"
                  >
                    <v-list-tile-title>{{ btn.title }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider :key="`divider-${item.id}`"></v-divider>

          <v-card-title primary-title>
            <div>
              <div class="headline">{{ item.name }}</div>
              <span class="grey--text" style="word-break: break-all;">{{item.description }}</span>
            </div>
          </v-card-title>

          <v-img v-if="item.photos.length"
                 :src="item.photos[0].image">
          </v-img>

          <div class="mb-3">
            <v-card-actions>
              <div class="mt-3">
                <v-badge overlap color="red">
                  <span slot="badge">{{ item.likes_count }}</span>
                  <v-btn flat color="purple" @click="likeUnlike(item.id)">
                    <v-icon>{{item.liked_by_me ? 'favorite' : 'favorite_border' }}</v-icon>
                  </v-btn>
                </v-badge>

                <v-badge overlap color="red">
                  <span slot="badge">{{ item.comments_count ? item.comments_count : 0 }}</span>
                  <v-btn flat color="purple" @click="openCommentBlock(item.id)">
                    <v-icon>comment</v-icon>
                  </v-btn>
                </v-badge>
              </div>
            </v-card-actions>

            <comment-topic :topicId="item.id" v-if="openComment === item.id"></comment-topic>

          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import CommentTopic from './CommentTopic'
    import CreateTopic from './CreateTopic'
    import topicService from "@/services/topic-service";


    export default {
        components: {
            CommentTopic,
            CreateTopic
        },
        data() {
            return {
                openComment: null,
                menuItems: [
                    {title: 'Delete', name: 'delete'},
                ],
                showLoading: true
            }
        },
        created() {
            this.fetchData()
        },
        mounted() {
            this.lazyLoadingOnScroll();
        },
        watch: {
            '$route': 'fetchData'
        },
        computed: {
            topics() {
                return this.$store.getters.topics
            },
        },

        methods: {
            fetchData() {
                this.showLoading = true;
                topicService.getList()
                    .then(response => {
                        this.$store.commit('setTopics', response.data);
                    });
                this.showLoading = false
            },
            likeUnlike(itemId) {
                let item = this.$store.getters.topics.results.find(x => x.id === itemId);

                if (item.liked_by_me === false) {
                    topicService.setLike(itemId)
                        .then(() => (this.$store.commit('changeLike', itemId)));
                } else {
                    topicService.removeLike(itemId)
                        .then(() => (this.$store.commit('changeLike', itemId)));
                }
            },
            openCommentBlock(itemId) {
                if (this.openComment !== itemId) {
                    this.openComment = itemId
                } else {
                    this.openComment = null
                }
            },
            menuEvent(name, topicId) {
                if (name === 'delete') {
                    topicService.delete(topicId)
                        .then(() => (this.$store.commit('deleteTopic', topicId)));
                }
            },
            lazyLoadingOnScroll () {
                window.onscroll = () => {
                    let startLoading = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

                    if (startLoading && this.topics.next) {

                        this.$http.get(this.topics.next)
                            .then(response => {
                                let newData = this.topics;
                                newData.results = this.topics.results.concat(response.data.results);
                                newData.next = response.data.next;
                                this.$store.commit('setTopics', newData)
                            })
                    }

                };
            },
        }
    }
</script>

<style scoped>
  .topicLoadingBar {
    top: 40%;
    position: absolute;
    left: 50%;
  }
</style>