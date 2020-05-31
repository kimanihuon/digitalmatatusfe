<template>
  <v-container :class=" fetching ? 'fill-height' : ''">
    <!-- Loader -->
    <v-row v-if="fetching" no-gutters>
      <v-col justify="center" align="center">
        <v-progress-circular :size="70" :width="7" color="purple" indeterminate></v-progress-circular>
        <p class="py-4">Fetching ...</p>
      </v-col>
    </v-row>

    <!-- Favourites -->
    <v-row no-gutters>
      <v-col cols="12">
        <favourites />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: "home",

  components: {
    'favourites': () => import(/* webpackChunkName: "favourites" */ "@/components/favourites")
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
      favouriteRoutes: []
    };
  },

  mounted() {
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
};
</script>
