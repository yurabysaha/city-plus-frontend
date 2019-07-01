<template>
  <div>
    <date-filter-top @selectItem="uploadEventsForDay"></date-filter-top>

      <v-container grid-list-md>
        <v-layout row wrap justify-center >
          <event-card v-for="event in events.results" :key="event.id" :event="event"></event-card>
        </v-layout>
      </v-container>

  </div>
</template>

<script>
    import DateFilterTop from "./DateFilterTop"
    import EventCard from "./EventCard"
    import VContent from "vuetify/lib/components/VGrid/VContent";

    export default {
        components: {
            VContent,
            EventCard,
            DateFilterTop
        },
        data() {
            return {}
        },
        computed: {
            events() {
                return this.$store.getters.events
            }
        },
        methods: {
            uploadEventsForDay(date) {
                this.$http
                    .get(`events/by_dates/?events_from=${date.date}&events_to=${date.date}`)
                    .then(response => (this.$store.commit('setEvents', response.data)));
            }
        },
    }
</script>

<style scoped>

</style>