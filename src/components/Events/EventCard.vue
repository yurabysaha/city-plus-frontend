<template>
        <v-flex xs12 md6 lg4>
          <v-card class="radius-for-card" :to="{name: 'event-detail', params: {eventId: event.id}}">
            <v-img
                :src="event.photo"
                height="300px"
            >
              <v-container
                      fill-height
                      fluid
                      pa-2
              >
                <v-layout fill-height>

                </v-layout>
              </v-container>
            </v-img>
            <div class="ml-3"> {{ event.start_date }} - {{ event.end_date }} </div>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ event.name }} </h3>
                <div> {{ event.place.name }} </div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>

</template>

<script>
    export default {
        name: "event-card2",
        props: ['event'],
    }
</script>

<style scoped>
  .radius-for-card {
    border-radius: 20px;
  }
</style>