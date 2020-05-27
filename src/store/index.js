import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    userDetails: {},
    pages: [
      { name: "Home", icon: "mdi-home", link: "/" },
      { name: "Routes", icon: "mdi-routes", link: "/routes" },
      { name: "Account", icon: "mdi-account", link: "/account" },
      { name: "Login", icon: "mdi-login", link: "/login" }
    ],
    auth: false,
    page_count: 10,
    pages_fetched: {},
    gtfs: {
      routes: {}
    },
    periods: {
      selection: 6,
      tags: [
        "Current Time",
        "6:00-7:00",
        "7:00-8:00",
        "8:00-9:00",
        "9:00-10:00",
        "10:00-11:00",
        "11:00-1:00",
        "1:00-2:00",
        "2:00-3:00",
        "3:00-4:00",
        "4:00-5:00",
        "5:00-6:00"
      ]
    },
    main_color: "#1F7087"
  },
  mutations: {
    addRoutes(state, payload) {
      state.gtfs.routes[payload.page] = [];
      state.gtfs.routes[payload.page] = payload.data;
      state.gtfs.total_routes = payload.total;
    },
    updateRoute(state, route) {
      state.gtfs.routes[`p${route.page_number}`][route.block_index].trips = route.data;
    },
    updateSelection(state, value) {
      state.periods.selection = value
    },
    setUserDetails(state, details) {
      state.userDetails = details;
    },
    switchAuth(state, value) {
      state.auth = value;
    }
  },
  actions: {},
  modules: {},
  getters: {}
});
