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
                  :start_point_id="trips[`direction${trip.direction_id}`].stops[0].stop_id"
                  :stop="stop"
                  :route_id="route.route_id"
                  :period="current_period"
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
import Fare from "../controllers/fetchFares";
var fetch_fares = new Fare();

export default {
  props: ["route"],
  components: {
    points: () => import(/* webpackChunkName: "points" */ "@/components/points")
  },
  data() {
    return {
      // Cached fares
      fares: {},
      periods: {},
      current_period: this.$store.state.periods.tags[
        this.$store.state.periods["selection"]
      ],
      trips: {
        direction0: {},
        direction1: {}
      },
      page_count: 10,
      fetched_direction0_stops: false,
      fetched_direction1_stops: false
    };
  },
  computed: {
    tab: {
      get() {
        return this.$store.state.current_tab;
      },
      set(value) {
        this.$store.commit("updateTab", value);
      }
    },
  },
  methods: {
    infiniteHandler($state, trip, trip_index) {
      var instance = this;
      var direction = trip.direction_id == "0" ? "direction0" : "direction1";
      var direction_id;

      // Getting the trip start point
      if (trip_index == 0) {
        direction_id = 1;
      } else {
        direction_id = 0;
      }

      // If we're not in the first page
      if (!(instance.trips[direction].page > 0)) {
        instance.trips[direction] = {
          page: 1,
          stops: [],
          stop_times: [],
          total_stops: 0,
          start_point: instance.route.trips[direction_id]
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

            // Fetched_directionX_stops = true
            instance[`fetched_${direction}_stops`] = true;
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
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "updateSelection") {
        this.current_period = state.periods.tags[state.periods.selection];

        fetch_fares.fetch(
          this,
          // this.trips.direction0.stops[0].stop_id,
          this.trips[`direction${this.tab}`].stops[0].stop_id,
          state.periods.tags[state.periods.selection]
        );
      }
    });
  },

  watch: {
    fetched_direction0_stops: {
      deep: true,
      handler(change) {
        fetch_fares.fetch(
          this,
          this.trips.direction0.stops[0].stop_id,
          this.current_period
        );
        // console.log('direction0')
        change;
      }
    },
    fetched_direction1_stops: {
      deep: true,
      handler(change) {
        fetch_fares.fetch(
          this,
          this.trips.direction1.stops[0].stop_id,
          this.current_period
        );
        // console.log('direction1')
        change;
      }
    }
  }
};
</script>

<style scoped>
.list {
  height: 60vh;
  overflow: auto;
}
</style>
