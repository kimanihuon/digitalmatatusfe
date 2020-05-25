import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    pages: [
      { name: "Home", icon: "mdi-home", link: "/" },
      { name: "Routes", icon: "mdi-routes", link: "/routes" },
      { name: "Account", icon: "mdi-account", link: "/account" },
    ],
    page_count: 10,
    pages_fetched: {},
    gtfs: {
      routes: {}
    },
    main_color: "#1F7087"
  },
  mutations: {
    addRoutes(state, payload){
      state.gtfs.routes[payload.page] = [];
      state.gtfs.routes[payload.page] = payload.data;
      state.gtfs.total_routes = payload.total;
    },
    updateRoute(state, route) {
      state.gtfs.routes[`p${route.page_number}`][route.block_index].trips = route.data;
    }
  },
  actions: {},
  modules: {},
  getters: {}
});
