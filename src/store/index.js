import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    page: 1,
    page_count: 10,
    gtfs: {}
  },
  mutations: {
    changePage(state, payload){
      state.page = payload
    },
    changeGTFS(state, payload){
      state.gtfs[payload.name] = payload.data
    }
  },
  actions: {},
  modules: {},
  getters: {}
});
