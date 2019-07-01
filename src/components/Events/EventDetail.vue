<template>
  <v-container fluid>
    <!--Loading bar-->
    <div v-show="showLoading" class="eventLoadingBar">
      <v-progress-circular
              :width="3"
              :size="70"
              color="red"
              indeterminate
      ></v-progress-circular>
    </div>

  <v-layout wrap v-if="event">
    <v-flex xs12 md7 mr-3>
      <v-card>
        <v-img
                :src="event.photo"
                aspect-ratio="2.75"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ event.name }}</h3>
          </div>
        </v-card-title>

        <v-card-actions>
          <div> {{ event.about }} </div>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex mr-3 md4 sm12>
      <v-card tile>
        <v-container>
        <div class="title font-weight-light">Do you plan to visit?</div>
        <div class="hidden-xs-only">
          <v-btn :outline="event.my_attendee_status !== 2" large color="warning" @click="changeAttendeeStatus(2)">Maybe</v-btn>
          <v-btn :outline="event.my_attendee_status !== 1" large color="success" @click="changeAttendeeStatus(1)">Yes</v-btn>
          <v-btn :outline="event.my_attendee_status !== 0" large color="error" @click="changeAttendeeStatus(0)">No</v-btn>
        </div>
          <!--Show small icon on sm -->
        <div class="hidden-sm-and-up">
          <v-btn :outline="event.my_attendee_status !== 2" fab color="warning" @click="changeAttendeeStatus(2)"><v-icon>hourglass_empty</v-icon>
          </v-btn>
          <v-btn :outline="event.my_attendee_status !== 1" fab color="success" @click="changeAttendeeStatus(1)"><v-icon>check</v-icon></v-btn>
          <v-btn :outline="event.my_attendee_status !== 0" fab color="error" @click="changeAttendeeStatus(0)"><v-icon>close</v-icon></v-btn>
        </div>
        </v-container>
      </v-card>
      <v-card tile>
        <v-container v-if="interestedIn.length">
          <div class="title font-weight-light">People interested in</div>

          <v-layout row align-center justify-start>
              <v-avatar v-for="user in interestedIn" class="mt-2" color="grey lighten-1">
                <img v-if="user.photos"
                        :src="user.photos[0].image"
                        :alt="user.first_name"
                        class="elevation-6"
                >
                <span v-else class="white--text headline">{{user.first_name[0]}}</span>

              </v-avatar>
          </v-layout>

        </v-container>
      </v-card>

      <v-card tile>
        <v-container>
          <div class="title font-weight-light">Discussion</div>

          <v-layout row align-center justify-start>
            <v-text-field
                    placeholder="Enter your text..."
                    v-model="newComment"
                    @keyup.enter="addNewComment"
            ></v-text-field>

            <v-btn flat icon @click="addNewComment">
              <v-icon>send</v-icon>
            </v-btn>

          </v-layout>

        </v-container>
        <v-list two-line v-if="eventComments.results.length"
                v-for="(item, index) in eventComments.results">

          <v-divider
                  :key="index"
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

          </v-list-tile>
        </v-list>
      </v-card>

    </v-flex>

  </v-layout>

  </v-container>
</template>

<script>
    export default {
        name: "event-detail",
        data () {
            return {
                showLoading: true,
                event: null,
                newComment: '',
                eventComments: {
                    results: []
                },
            }
        },
        computed: {
            interestedIn() {
                let slice = this.event.attendees.length;

                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': slice = 7;
                        break;
                    case 'sm': slice = 9;
                        break;
                    case 'md': slice = 5;
                        break;
                    case 'lg': slice = 7;
                        break;
                    case 'xl': slice = 10;
                        break
                }
                return this.event.attendees.slice(0, slice)
            }
        },
        watch: {
            '$route': ['fetchEvent', 'fetchEventComments']
        },
        created() {
            this.fetchEvent();
            this.fetchEventComments()
        },
        methods: {
            fetchEvent() {
                this.showLoading = true;
                this.$http
                    .get(`events/${this.$attrs.eventId}/`)
                    .then(response => {
                        this.event = response.data;
                        this.showLoading = false;
                    }).catch(e => console.log(e));
            },
            fetchEventComments() {
                this.showLoading = true;
                this.$http
                    .get(`event/${this.$attrs.eventId}/comments/`)
                    .then(response => {
                        this.eventComments = response.data;
                        this.showLoading = false
                    }).catch(e => console.log(e));
            },
            addNewComment() {
                this.$http
                    .post(`event/${this.$attrs.eventId}/comments/`, { text: this.newComment })
                    .then(response => {
                        this.eventComments.results.unshift(response.data);
                        this.newComment = '';
                        this.showLoading = false
                    }).catch(e => console.log(e));
            },
            changeAttendeeStatus(status) {
                let userId = this.$store.getters.user.user;
                this.$http
                   .post(`event/${this.$attrs.eventId}/attendee/`, { attendee_status: status })
                   .then(() => {
                       this.event.my_attendee_status = status;
                       // If status === 0 (Not visit) remove self from attendees else add to attendees
                       if (status === 0) {
                            this.event.attendees = this.event.attendees.filter(item => item.id !== userId)
                       } else {
                           let exist = this.event.attendees.find(i => i.id === userId);
                           if (!exist) {
                               this.event.attendees.unshift(
                               {
                                   first_name: this.$store.getters.user.first_name,
                                   id: userId,
                                   is_friend: false,
                                   last_name: this.$store.getters.user.last_name,
                                   photos: this.$store.getters.user.photos
                               }
                           )}

                       }
                   })
            }
        },
    }
</script>

<style scoped>
  .eventLoadingBar {
    top: 40%;
    position: absolute;
    left: 50%;
  }
</style>