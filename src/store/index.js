import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  darkmode: false,
  state: {
    current_tab: 0,
    userDetails: {},
    fetching_fares: true,
    stats: {
      contributions: {
        total: 0
      },
      routes: {
        total_routes: 0,
        total_stops: 0
      },
    },
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
      routes: {},
      favourites: [],
      fares: {}
    },
    periods: {
      selection: 6,
      tags: [
        "6:00-7:00",
        "7:00-8:00",
        "8:00-9:00",
        "9:00-10:00",
        "10:00-11:00",
        "11:00-12:00",
        "12:00-13:00",
        "13:00-14:00",
        "14:00-15:00",
        "15:00-16:00",
        "16:00-17:00",
        "18:00-19:00",
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
    addFavourites(state, payload) {
      state.gtfs.favourites = payload.data;
    },
    fetchingFares(state){
      state.fetching_fares = true;
    },
    updateStats(state, payload) {
      if (payload.type == 'routes') {
        state.stats.routes.total_stops = payload.data.total_stops;
        state.stats.routes.total_routes = payload.data.total_routes;
      } else if (payload.type == 'contributions') {
        state.stats.contributions.total = payload.data.total_contributions
      }
    },
    updateSelection(state, payload) {
      state.periods.selection = payload
    },
    updateTab(state, payload){
      state.current_tab = payload
    },
    updateProfile(state, payload) {
      state.userDetails.name = payload.name;
      state.userDetails.phone = payload.phone;
      state.userDetails.tagline = payload.tagline;
      state.userDetails.about = payload.about;
    },

    updateFares(state, payload) {
      // origin_id.period.destination_id
      if (!state.gtfs.fares[payload.origin_id]) {
        state.gtfs.fares[payload.origin_id] = {}
      }
      state.gtfs.fares[payload.origin_id][payload.period] = payload.fares

      state.fetching_fares = false;

    },

    setUserDetails(state, details) {
      state.userDetails = details;
    },
    switchAuth(state, value) {
      state.auth = value;
    },
    switchTheme(state) {
      state.darkmode = !state.darkmode;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getFetchingFares: state => state.fetching_fares
  }
});
