<template>
  <v-container fluid>
    <!-- Favourites -->
    <v-row no-gutters>
      <!-- Loader -->
      <v-col justify="center" align="center" v-if="fetching_favourites">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        <p class="py-4">Fetching ...</p>
      </v-col>

      <!-- Favourites -->
      <v-col cols="12" v-if="!fetching_favourites">
        <favourites :routes="favouriteRoutes" />
      </v-col>
    </v-row>

    <!-- Stats -->
    <v-row>
      <!-- Loader -->
      <v-col justify="center" align="center" v-if="fetching_contrib_stats || fetching_route_stats">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        <p class="py-4">Fetching ...</p>
      </v-col>

      <!-- Stats -->
      <v-col cols="12" v-if="!fetching_contrib_stats && !fetching_route_stats">
        <stats v-if="fetching_contrib_success && fetching_rstats_success" :stats="stats" />
        <v-card-subtitle v-if="!fetching_contrib_success || !fetching_rstats_success"> Failed fetching stats please try refreshing the page </v-card-subtitle>
      </v-col>
    </v-row>

    <!-- Charts -->
    <v-row>
      <!-- Loader -->
      <v-col justify="center" align="center" v-if="fetching_contrib_stats || fetching_route_stats">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        <p class="py-4">Fetching ...</p>
      </v-col>

      <!-- Charts -->
      <v-col cols="12" v-if="!fetching_contrib_stats && !fetching_route_stats">
        <charts />
        <v-card-subtitle v-if="!fetching_contrib_success || !fetching_rstats_success"> Failed fetching stats please try refreshing the page </v-card-subtitle>
      </v-col>
    </v-row>


  </v-container>
</template>

<script>
function get_location(navigator) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log(pos);
      },
      err => {
        console.log(err);
      }
    );
  } else {
    this.errStr = "Geolocation is not supported by this browser.";
  }
}

function fetch_favourites(instance) {
  instance.fetching_favourites = true;
  instance.$http
    .get(`${instance.$url}/api/routes?page=3&page_count=10`)
    .then(function(response) {
      if (response.data.success) {
        instance.$store.commit("addFavourites", {
          data: response.data.info.routes
        });

        instance.fetching_favourites = false;
        console.log("Favourites Received successfully");
      } else {
        // TODO: Add error handler
      }
    })
    .catch(error => {
      instance.fetching_favourites = false;
      console.log(error);
    });
}

function fetch_contribution_stats(instance, auth) {
  var destination = auth ? "verifiedUserstats" : "generalstats";

  instance.fetching_contrib_stats = true;
  instance.$http
    .create({ withCredentials: true })
    .get(`${instance.$auth}/api/${destination}`)
    .then(function(response) {
      if (response.data.success) {
        instance.$store.commit("updateStats", {
          type: 'contributions',
          data: response.data.stats
        });

        instance.fetching_contrib_stats = false;
        instance.fetching_contrib_success = true;
        console.log("Contribution stats Received successfully");
      } else {
        console.log(response.data.message);
        // TODO: Add error handler
      }
    })
    .catch(error => {
      instance.fetching_contrib_stats = false;
      console.log(error);
    });
}

function fetch_route_stats(instance) {
  instance.fetching_route_stats = true;
  instance.$http
    .get(`${instance.$url}/api/stats`)
    .then(function(response) {
      if (response.data.success) {
        instance.$store.commit("updateStats", {
          type: 'routes',
          data: response.data.info
        });

        instance.fetching_route_stats = false;
        instance.fetching_rstats_success = true;
        console.log("Route and Stop stats Received successfully");
      } else {

        // TODO: Add error handler
      }
    })
    .catch(error => {
      instance.fetching_route_stats = false;
      console.log(error);
    });
}

export default {
  name: "home",

  components: {
    favourites: () => import(/* webpackChunkName: "favourites" */ "@/components/favourites"),
    stats: () => import(/* webpackChunkName: "stats" */ "@/components/stats"),
    charts: () => import(/* webpackChunkName: "charts" */ "@/components/charts")
  },

  metaInfo() {
    return {
      title: "Digimatt Home",
      titleTemplate: "%s | View different routes in Nairobi and compare prices",
      meta: [
        { charset: "utf-8" },
        { name: "description", content: "Digimatt Routes and fares" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ]
    };
  },
  data() {
    return {
      location: null,
      gettingLocation: false,
      errStr: null,
      stats: {},
      fetching_contrib_stats: false,
      fetching_contrib_success: false,
      fetching_favourites: false,
      fetch_favourites_success: false,
      fetching_route_stats: false,
      fetching_rstats_success: false,
      favouriteRoutes: this.$store.state.gtfs.favourites
    };
  },

  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "addFavourites") {
        this.favouriteRoutes = state.gtfs.favourites;
      }
      if (mutation.type === "updateStats"){
        this.stats = state.stats
      }
    });

    get_location(navigator);
    fetch_favourites(this);
    fetch_route_stats(this);
    if (this.$store.state.auth) {
      fetch_contribution_stats(this, true);
    } else {
      fetch_contribution_stats(this, false);
    }
    // if (this.$store.state.auth) {
    //   fetch_favourites(this, this.$store.state.userDetails._id)
    // } else {
    //   fetch_favourites(this, false)
    // }
  }
};
</script>

<style scoped>

/* .bak{
  background-color: rgba(151, 152, 153, 0.3);
} */

</style>
