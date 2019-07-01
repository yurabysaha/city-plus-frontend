<template>
  <v-dialog v-model="dialog" persistent max-width="600">
  <v-layout row>
    <v-flex xs12 sm12>
      <v-card v-if="user">
            <v-img
                    :src="user.photos.length ? user.photos[0].image : defaultImage"
                    height="300px" >
          <v-layout
                  column
                  fill-height
          >
            <v-card-title>

              <v-spacer></v-spacer>

              <v-btn dark icon color="blue-grey" @click="$emit('close')">
                <v-icon>close</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">{{user.first_name + ' ' + user.last_name}}</div>
              <v-spacer></v-spacer>
              <v-btn fab dark small class="mt-5" color="error" @click="removeFromFriends()">
                <v-icon dark>person_add_disabled</v-icon>
              </v-btn>
            </v-card-title>

          </v-layout>
            </v-img>
            </v-img>
        <v-list two-line v-if="user.about">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="indigo">recent_actors</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-sub-title>About</v-list-tile-sub-title>

              <v-list-tile-title>{{user.about}}</v-list-tile-title>
            </v-list-tile-content>

            <!--Chat button-->
            <!--<v-list-tile-action>-->
              <!--<v-icon>chat</v-icon>-->
            <!--</v-list-tile-action>-->
          </v-list-tile>

          <!--<v-divider inset></v-divider>-->
          <!--<v-list-tile>-->
            <!--<v-list-tile-action>-->
              <!--<v-icon color="indigo">location_on</v-icon>-->
            <!--</v-list-tile-action>-->

            <!--<v-list-tile-content>-->
              <!--<v-list-tile-title>1400 Main Street</v-list-tile-title>-->
              <!--<v-list-tile-sub-title>Orlando, FL 79938</v-list-tile-sub-title>-->
            <!--</v-list-tile-content>-->
          <!--</v-list-tile>-->
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
  </v-dialog>
</template>

<script>
    import userService from "@/services/user-service";
    import friendService from "@/services/friend-service";

    export default {
        name: "user-profile-read-only",
        props: ['userId'],
        data() {
            return {
                dialog: true,
                user: null
            }
        },
        created() {
            this.fetchData()
        },
        computed: {
            defaultImage () {
                return require('@/assets/profile-default.jpg')
            }
        },
        methods: {
            fetchData() {
                userService.getUserById(this.userId)
                    .then(response => (this.user = response.data));
            },
            removeFromFriends() {
                this.$confirm(`Do you really want delete ${this.user.first_name} from friends?`).then(res => {
                    if (res) {
                        friendService.removeFromFriend(this.userId)
                            .then(() => {
                                this.$emit('friendRemoved');
                                this.$emit('close')
                            })
                    }
                })
              }
            }
    }
</script>

<style scoped>

</style>