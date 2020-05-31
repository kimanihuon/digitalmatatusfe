<template>
  <v-container :class="fetching ? 'fill-height' : ''">
    <!-- Loader -->
    <v-row no-gutters v-if="fetching" >
      <v-col justify="center" align="center">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        <p class="py-4">Fetching ...</p>
      </v-col>
    </v-row>

    <!-- Favourites -->
    <v-row no-gutters v-if="!fetching">
      <v-col cols="12">
        <favourites :routes="favouriteRoutes" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
function fetch_favourites(instance) {
  instance.fetching = true;
  instance.$http
    .get(`${instance.$url}/api/routes?page=3&page_count=10`)
    .then(function(response) {
      if (response.data.success) {
        instance.$store.commit("addFavourites", {
          data: response.data.info.routes
        });

        instance.fetching = false;
        console.log("Favourites Received successfully");
      } else {
        // TODO: Add error handler
      }
    })
    .catch(error => {
      instance.fetching = false;
      console.log(error);
    });
}

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

export default {
  name: "home",

  components: {
    favourites: () =>
      import(/* webpackChunkName: "favourites" */ "@/components/favourites")
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
      fetching: false,
      fetch_favourites_success: false,
      favouriteRoutes: this.$store.state.gtfs.favourites,
    };
  },

  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "addFavourites") {
        this.favouriteRoutes = state.gtfs.favourites;
      }
    });
    get_location(navigator);
    fetch_favourites(this);
    // if (this.$store.state.auth) {
    //   fetch_favourites(this, this.$store.state.userDetails._id)
    // } else {
    //   fetch_favourites(this, false)
    // }
  }
};
</script>
