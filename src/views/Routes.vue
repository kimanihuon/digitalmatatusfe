<template>
  <v-container>
    <!-- Dialog elements -->
    <v-row no-gutters v-if="dialog">
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
          <progressIndicator v-if="fetching_trips" />
          <tabs v-if="trips_fetch_success && !fetching_trips" :route="active_route" />
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Route blocks -->
    <v-row no-gutters class="mb-4">
      <v-col
        v-for="(route, idx) in routes[`p${page_number}`]"
        :key="idx"
        cols="12"
        xs="6"
        sm="4"
        md="4"
        lg="3"
      >
        <block :route="route" @activate="popup(...arguments, idx, page_number)"></block>
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
        :value="page"
        @input="pagination"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
import block from "../components/block";
import chips from "../components/chips";
import tabs from "../components/tabs";
import progressIndicator from "../components/circularIndicator";

function fetch_routes(instance) {
  // Remember to include the last foward slash
  instance.$http
    .get(
      `${instance.$url}/api/routes?page=${instance.page}&page_count=${instance.page_count}`
    )
    .then(function(response) {
      response.data.info.routes.total = response.data.info.total;
      instance.$store.commit("addRoutes", {
        page: `p${instance.page}`,
        data: response.data.info.routes,
        total: response.data.info.total
      });
      instance.page_number = instance.page;
      console.log("Routes Received successfully");
    })
    .catch(error => {
      console.log(error);
    });
}

export default {
  name: "Home",

  metaInfo() {
    return {
      title: "Routes",
      titleTemplate: "%s | Digitmatt Routes page",
      meta: [
        { charset: "utf-8" },
        { name: "description", content: "Digimatt Routes and fares" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ]
    };
  },

  components: {
    block,
    chips,
    tabs,
    progressIndicator
  },

  data() {
    return {
      page: 1,
      page_number: 1,
      page_count: 10,
      length: 0,
      dialog: false,
      active_route: {},
      trips_fetch_success: false,
      trips_fetch_failed: false,
      fetching_trips: false
    };
  },
  methods: {
    popup(args, idx, page_number) {
      this.active_route = args;
      this.dialog = true;
      this.fetch_trips(args, idx, page_number);
    },
    fetch_trips(active_route, idx, page_number) {
      var instance = this;
      this.fetching_trips = true;
      this.trips_fetch_success = false;

      if (!active_route.trips) {
        this.$http
          .get(`${this.$url}/api/trips?route_id=${active_route.route_id}`)
          .then(function(response) {
            instance.$store.commit("updateRoute", {
              page_number: page_number,
              block_index: idx,
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
        this.fetching_trips = false;
      }
    },
    pagination(number) {
      if (!this.$store.state.gtfs.routes[`p${number}`]) {
        fetch_routes(this);
        console.log(`Page: ${number} fetched successfully`);
      } else {
        // The page will switch immediately but page_number ...
        // ... will wait until the routes have been fetched
        this.page_number = this.page;
      }
    },
    log(number) {
      console.log(number);
    }
  },
  computed: {
    main_color() {
      return this.$store.state.main_color;
    },
    routes() {
      return this.$store.state.gtfs.routes;
    }
  },
  mounted() {
    // Watch for when the Api response is received
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "addRoutes") {
        state;
        this.length = Math.round(
          this.$store.state.gtfs.total_routes / this.page_count
        );
      }
    });

    fetch_routes(this);
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
