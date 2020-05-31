<template>
  <v-container>
    <!-- Dialog elements -->
    <v-row no-gutters v-if="dialog">
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <router-view @closeDialog="closeDialog()"/>
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
        <block :route="route" @activate="popup(...arguments)"></block>
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
  name: "routes",

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
    'block': () => import(/* webpackChunkName: "block" */ "@/components/block"),
    // 'chips': () => import(/* webpackChunkName: "chips" */ "@/components/chips"),
    // 'tabs': () => import(/* webpackChunkName: "tabs" */ "@/components/tabs"),
    // 'progressIndicator': () => import(/* webpackChunkName: "progressIndicator" */ "@/components/circularIndicator"),
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
    popup(args) {
      args.page = this.page;
      args.page_count = this.page_count;
      this.dialog = true;
      this.$router.push({ path: `/routes/${args.route_short_name}`, query: args })
    },
    pagination(number) {

      this.$router.push({ path: '/routes', query: { page: number, page_count: this.page_count } })

      // If the route hasn't already been fetched
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
    },
    closeDialog(){
      this.dialog = false;
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

    this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1;
    this.page_count = this.$route.query.page_count ? parseInt(this.$route.query.page_count) : 10;

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

    if (this.$route.params.route_id && this.$route.query.route_id) {
      this.dialog = true;
    }

  },

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
