<template>
    <v-layout class="scroll">
      <div class="date-card" :class="{'active-card': activeDate == date}" v-for="date in dates" @click="selectItem(date)">
        <div class="date-number">{{date.dayNumber}}</div>
        <div class="date-title">{{date.dayName}}</div>
      </div>
    </v-layout>
</template>

<script>
    import * as moment from "moment";

    export default {
        name: "date-filter-top",
        data() {
            return {
                activeDate: null
            }
        },
        computed: {
            // Get next 7 days of week from now.
            dates() {
                let day;
                let tomorrow;
                let today = moment();
                let week = [];

                for (let i=0; i <= 6; i++) {
                    tomorrow = moment(today).add(i, 'days');

                    day = {
                        dayNumber: tomorrow.format('D'),
                        dayName: tomorrow.format('dddd'),
                        date: tomorrow.format('YYYY-MM-DD')
                    };

                    week.push(day)
                }
                this.selectItem(week[0]);

                return week;
            }
        },
        methods: {
            selectItem(date) {
                this.$emit('selectItem', date);
                this.activeDate = date
            }
        }
    }
</script>

<style scoped>
  .scroll {
    align-items: center;
    justify-content: center;
    display: -webkit-box;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    padding-bottom: 12px;
    margin-bottom: 10px;
  }

  .scroll::-webkit-scrollbar {
    /*display: none;*/
  }
  .date-card {
    border: 1px rgba(74, 72, 61, 0.34) solid;
    height: 150px;
    width: 200px;
    position: relative;
    border-radius: 20px;
    /*background-color: #a3ffb8;*/
    margin-right: 5px;
    background-image: url("../../assets/backgrounddates.jpeg");
    transition-duration: 0.4s;

  }
  .date-card:hover {
    transform: scale(0.92);
  }

  .active-card {
    transform: scale(0.92);
  }

  .date-card > .date-title {
    position: absolute;
    bottom: 10px;
    right: 50px;
    font-size: 20px;
    color: white;
  }
  .date-card > .date-number {
    margin: 6px;
    padding: 8px;
    border-radius: 20px;
    font-size: 16px;
    border: 1px rgba(255, 255, 255, 0.88) solid;
    position: absolute;
    top: -1px;
    color: white;
    font-weight: bold;
    background-color: rgba(4, 4, 4, 0.12);
  }
</style>