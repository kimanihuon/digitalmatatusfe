<template>
  <v-container>
    <!-- Dialog elements -->
    <v-row no-gutters>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-toolbar dense dark :color="main_color">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ active_route.route_short_name}} | {{ active_route.route_long_name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items></v-toolbar-items>
        </v-toolbar>
        <v-card>
          <chips />
          <tabs v-if="trips_fetch_success" :route="active_route" />
          <progressIndicator v-if="fetching_trips" />
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Route blocks -->
    <v-row no-gutters class="mb-4">
      <v-col v-for="(route, idx) in routes" :key="idx" cols="12" xs="6" sm="4" md="4" lg="3">
        <block :route="route" @activate="popup(...arguments, idx)"></block>
      </v-col>
    </v-row>

    <!-- Page navigation -->
    <v-row no-gutters justify="center" class="pt-12">
      <v-pagination
        circle
        :color="main_color"
        id="pagination-el"
        v-model="page"
        :length="length"
        :total-visible="10"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import block from "../components/block";
import chips from "../components/chips";
import tabs from "../components/tabs";
import progressIndicator from "../components/circularIndicator";

export default {
  name: "Home",

  components: {
    block,
    chips,
    tabs,
    progressIndicator
  },

  data() {
    return {
      page: 1,
      length: 0,
      page_count: 10,
      routes: [],
      dialog: false,
      active_route: {},
      trips_fetch_success: false,
      trips_fetch_failed: false,
      fetching_trips: false
    };
  },
  methods: {
    popup(args, idx) {
      this.active_route = args;
      this.dialog = true;
      this.fetch_trips(args, idx);
    },
    fetch_trips(active_route, idx) {
      var instance = this;
      this.fetching_trips = true;
      this.trips_fetch_success = false;

      if (!active_route.trips) {
        this.$http
          .get(`${this.$url}/api/trips?route_id=${active_route.route_id}`)
          .then(function(response) {
            instance.$store.commit("updateRoute", {
              index: idx,
              data: response.data.info.trips
            });
            console.log("Trips Received successfully");
            instance.fetching_trips = false;
            instance.trips_fetch_success = true;
          })
          .catch(error => {
            instance.fetching_trips = false;
            console.log(error);
          });
      } else {
        instance.trips_fetch_success = true;
      }
    }
  },
  computed: {
    main_color() {
      return this.$store.state.main_color;
    }
  },
  mounted() {
    // Watch for when the Api response is received
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "changeGTFS") {
        this.routes = state.gtfs.routes;
        this.length = Math.round(
          this.$store.state.gtfs.routes.total / this.page_count
        );
      }
    });

    var instance = this;
    // Remember to include the last foward slash
    this.$http
      .get(
        `${this.$url}/api/routes?page=${instance.page}&page_count=${instance.page_count}`
      )
      .then(function(response) {
        response.data.info.routes.total = response.data.info.total;
        instance.$store.commit("changeGTFS", {
          name: "routes",
          data: response.data.info.routes
        });
        console.log("Routes Received successfully");
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
#pagination-el {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 20px;
}
</style>
