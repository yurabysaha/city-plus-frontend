<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h1>MAP</h1>
        <textarea v-model="textVariable" style="border: 1px solid"></textarea>
        <ul id="example-1">
          <li v-if="arrayValue" v-for="item in arrayValue">
            {{ item.label }}
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

    export default {
        data() {
            return {
                textVariable: ''
            }
        },
        computed: {
            arrayValue() {
                if (this.textVariable) {
                    return this.textVariable.split('\n').map(e => ({label:e}))
                } else {
                    return []
                }
            },
        },
    }
</script>

<style scoped>

</style>