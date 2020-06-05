<template>
  <div>
    <progressIndicator v-if="fetching_trips" />

    <div v-if="!fetching_trips">
      <v-toolbar dense dark :color="main_color">
        <v-btn icon dark @click="back()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ activeMatatuRoute.route_short_name}} | {{ activeMatatuRoute.route_long_name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items></v-toolbar-items>
      </v-toolbar>
      <v-card>
        <chips @update="update" />
        <progressIndicator v-if="fetching_trips" />
        <tabs v-if="trips_fetch_success && !fetching_trips" :route="activeMatatuRoute" />
      </v-card>
    </div>
  </div>
</template>

<script>
function fetch_trips(instance, route_id) {
  instance.fetching_trips = true;
  instance.trips_fetch_success = false;
  instance.$http
    .get(`${instance.$url}/api/trips?route_id=${route_id}`)
    .then(function(response) {
      instance.activeMatatuRoute.trips = response.data.info.trips;
      console.log("Trips Received successfully");
      instance.fetching_trips = false;
      instance.trips_fetch_success = true;
    })
    .catch(error => {
      instance.fetching_trips = false;
      console.log(error);
    });
}

export default {
  name: "single_route",

  data() {
    return {
      trips_fetch_success: false,
      trips_fetch_failed: false,
      fetching_trips: false,
      activeMatatuRoute: {},
      previousPageParams: {}
    };
  },

  components: {
    chips: () => import(/* webpackChunkName: "chips" */ "@/components/chips"),
    tabs: () => import(/* webpackChunkName: "tabs" */ "@/components/tabs"),
    progressIndicator: () =>
      import(
        /* webpackChunkName: "progressIndicator" */ "@/components/circularIndicator"
      )
  },

  computed: {
    main_color() {
      return this.$store.state.main_color;
    }
  },

  methods: {
    back(){
      // this.$router.go(-1)
      this.$router.push({ path: 'routes', query: { page: this.previousPageParams.page, page_count: this.previousPageParams.page_count } })
      this.$emit("closeDialog")
    },
    update(value){
      this.$store.commit("updateSelection", value);
    }
  },

  created() {
    this.activeMatatuRoute = this.$route.query;
    this.previousPageParams = { page: this.$route.query.page, page_count: this.$route.query.page_count }
    fetch_trips(this, this.$route.query.route_id);
  }
};
</script>