<template>
  <v-app>
    <v-navigation-drawer
            app
            temporary
            v-model="drawer"
    >
      <v-list>
        <v-list-tile
            v-for="item in items"
            :key="item.title"
            :to="item.link"
        >
          <v-list-tile-action>
            <v-icon v-if="item.icon" color="pink">{{item.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">City+</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-if="!$store.getters.user">
        <v-btn flat  :to="'/login'">Login</v-btn>
        <v-btn flat :to="'/registration'">Registration</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down" v-if="$store.getters.user">
        <v-btn flat :to="'/my_profile/edit'"> {{ $store.getters.user.first_name }} {{ $store.getters.user.last_name }}</v-btn>
        <v-icon @click='logout' color="orange darken-2">exit_to_app</v-icon>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>

export default {

    data() {
        return {
            drawer: false,
            items : [
                { title: 'City-Online', icon: 'map', link: '/map'},
                { title: 'Topics', icon: 'group', link: '/topics'},
                { title: 'Discounts', icon: 'store', link: '/discounts'},
                { title: 'Events', icon: 'event', link: '/events'},
                { title: 'Friends', icon: 'event', link: '/friends'},
                ],
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>