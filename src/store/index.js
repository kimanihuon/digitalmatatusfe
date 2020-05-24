import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    page_count: 10,
    gtfs: {},
    main_color: "#1F7087"
  },
  mutations: {
    changeGTFS(state, payload){
      state.gtfs[payload.name] = payload.data
    },
    updateRoute(state, route) {
      state.gtfs.routes[route.index].trips = route.data;
    }
  },
  actions: {},
  modules: {},
  getters: {}
});
