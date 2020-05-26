<template>
  <v-container>
    <v-sheet class="mx-auto" elevation="4" max-width="900">
      <v-tabs v-model="tab" background-color="primary" dark centered>
        <v-tab v-for="(trip, i) in route.trips" :key="i">To: {{ trip.trip_headsign }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(trip, i) in route.trips" :key="i">
          <v-card flat>
            <v-card-text>Headsign: {{ trip.trip_headsign }}, Available: {{ trip.service_id_id }}. Total Stops: {{ trips[`direction${trip.direction_id}`].total_stops }}</v-card-text>
            <v-layout column class="list">
              <div v-for="(stop, idx) in trips[`direction${trip.direction_id}`].stops" :key="idx">
                <points
                  :start_point="trips[`direction${trip.direction_id}`].start_point"
                  :stop="stop"
                  :fare="fares[stop.stop_id]"
                />
              </div>
              <infinite-loading @infinite="infiniteHandler($event, trip, i)"></infinite-loading>
            </v-layout>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-sheet>
  </v-container>
</template>

<script>
import points from "./points";

function updateFaresCache(list, instance) {
  for (let i = 0; i < list.length; i++) {
    instance.fares[list[i].destination_id] = list[i];
  }
}

export default {
  props: ["route"],
  components: {
    points
  },
  data() {
    return {
      tab: null,

      // Cached fares
      fares: {},
      trips: {
        direction0: {},
        direction1: {}
      },
      page_count: 10
    };
  },
  methods: {
    infiniteHandler($state, trip, trip_index) {
      var instance = this;
      var direction = trip.direction_id == "0" ? "direction0" : "direction1";
      var start_point;

      // Getting the trip start point
      if (trip_index == 0) {
        start_point = 1;
      } else {
        start_point = 0;
      }

      if (!(instance.trips[direction].page > 0)) {
        instance.trips[direction] = {
          page: 1,
          stops: [],
          stop_times: [],
          total_stops: 0,
          start_point: instance.route.trips[start_point]
        };
      }

      this.$http
        .get(
          `${this.$url}/api/stops?page=${instance.trips[direction].page}&page_count=${instance.page_count}&route_id=${instance.route.route_id}&trip_id=${trip.trip_id}`
        )
        .then(function(response) {
          if (response.data.info.stops.length > 1) {
            instance.trips[direction].page += 1;
            instance.trips[direction].stops.push(...response.data.info.stops);
            instance.trips[direction].stop_times.push(
              ...response.data.info.stop_times
            );
            instance.trips[direction].total_stops =
              response.data.info.total_stops;
            updateFaresCache(response.data.info.fares, instance);
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.list {
  height: 60vh;
  overflow: auto;
}
</style>
