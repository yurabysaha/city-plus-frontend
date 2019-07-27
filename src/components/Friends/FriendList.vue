<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <user-profile-read-only v-if="modalVisible"
                                    @friendRemoved="friendRemoved"
                                    @close="modalVisible = false"
                                    :userId="profileUserId">
            </user-profile-read-only>

            <v-list v-if="friends.count">
                <v-list-tile
                        v-for="item in friends.results"
                        :key="item.user"
                        avatar
                        @click="openModal(item.user)"
                >
                    <v-list-tile-avatar color="grey lighten-1">
                        <img v-if="item.photos" :src="item.photos[0].image">
                        <span v-else class="white--text headline">{{item.first_name[0]}}</span>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-html="item.first_name + ' ' + item.last_name"></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-icon :color="`teal`">chat_bubble</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <no-items :text="'You don\'t have any friends yet'" v-if="!friends.count"></no-items>
        </v-flex>
    </v-layout>
</template>

<script>
    import friendService from "@/services/friend-service";
    import UserProfileReadOnly from "@/components/Profile/UserProfileReadOnly"
    import NoItems from "@/components/Shared/NoItems"

    export default {

        components: {
            UserProfileReadOnly,
            NoItems,
        },

        data() {
            return {
                friends: {},
                profileUserId: null,
                modalVisible: false,
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                friendService.getList()
                    .then(response => this.friends = response.data);
            },
            openModal(userId) {
                this.profileUserId = userId;
                this.modalVisible = true
            },
            friendRemoved() {
                // Change friends array when we delete friend
                let friendInArray = this.friends.results.find(e => e.user === this.profileUserId);
                this.friends.results.splice(this.friends.results.indexOf(friendInArray), 1);
            }
        }
    }
</script>

<style scoped>

</style>