<template>
    <v-layout align-content-center justify-center>
      <v-flex md10 lg8>
        <v-card v-if="form">
          <v-card-text>
              <v-avatar size="110" color="#f4f7f9" class="mr-4 mb-3" style="position:relative; overflow: hidden;">
                  <img v-if="form.photos.length" :src="form.photos[0].image">
                  <button id="pick-avatar" class="text-change">Change</button>
              </v-avatar>
              <avatar-cropper
                      :labels='{submit: "Save", cancel: "Cancel"}'
                      @uploaded="handleUploaded"
                      :upload-url="uploadUrl"
                      :upload-headers="uploadHeaders"
                      upload-form-name="image"
                      :upload-form-data="{is_avatar: true }"
                      trigger="#pick-avatar"
              />

            <v-text-field
                    v-model="form.first_name"
                    label="FirstName">
            </v-text-field>
            <v-text-field
                    v-model="form.last_name"
                    label="Last Name">
            </v-text-field>
            <v-flex xs12 sm6 md4>
              <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="form.birthday"
                      persistent
                      lazy
                      full-width
                      width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                          v-model="form.birthday"
                          label="Birthday"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="form.birthday" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dialog.save(form.birthday)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-text-field
                    v-model="form.email"
                    label="Email Address">
            </v-text-field>
            <v-text-field
                    v-model="form.about"
                    label="About">
            </v-text-field>
            <span class="m-4">Configure your Push-notification settings</span>
            <v-layout align-center justify-center row wrap>
              <v-flex xs12 sm4 md4>
                <v-switch
                        v-model="form.push_on_message"
                        :label="'Get Push from chats'"
                ></v-switch>
              </v-flex>
              <v-flex xs12 sm4 md4>
              <v-switch
                        v-model="form.push_on_request"
                        :label="'Get Push on friend request'"
                ></v-switch>
              </v-flex>
              <v-flex xs12 sm4 md4>
              <v-switch
                        v-model="form.push_on_topic"
                        :label="'Get Push from topics'"
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :loading="loading" @click="updateProfile">
              <v-icon left dark>check</v-icon>
              Save Changes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
    import AvatarCropper from "vue-avatar-cropper"
    import {authHeader} from "@/_helpers";
    import userService from "@/services/user-service";

    export default {
        pageTitle: 'My Profile',
        components: {AvatarCropper},
        data() {
            return {
                modal: false,
                loading: false,
                form: undefined,
                uploadUrl: `${this.$http.defaults.baseURL}accounts/profile/add_photo/`,
                uploadHeaders: authHeader()
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            handleUploaded(resp) {
                this.form.photos.unshift(resp);
                this.$store.commit('setUser', this.form)
            },

            updateProfile() {
                userService.update(this.form)
                    .then(() => this.$store.commit('setUser', this.form))
                    .then(() => localStorage.setItem('user', JSON.stringify(this.form)))
            },

            fetchData() {
                userService.getUser()
                    .then(response => this.form = response.data);
            },
        }
    }
</script>

<style scoped>
  .text-change {
    position: absolute;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.57);
    color: white;
    width: 100px;
    padding-bottom: 4px;
    padding-top: 4px;
    text-align: center;
    border-radius: 50%;
    font-size: 10px;
    font-weight: bold;
    overflow: hidden;
  }
</style>
