<template>
  <v-container>
    <v-sheet class="mx-auto" elevation="4" max-width="800">
      <v-tabs v-model="tab" background-color="primary" dark centered>
        <v-tab v-for="(item, i) in route.trips" :key="i">To: {{ item.trip_headsign }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, i) in route.trips" :key="i">
          <v-card flat>
            <v-card-text> {{ item.trip_headsign }}, available: {{ item.service_id_id }}</v-card-text>
            <v-layout column class="list">
              <div v-for="item in list" :key="item">
                <points />
              </div>
              <infinite-loading @infinite="infiniteHandler"></infinite-loading>
            </v-layout>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-sheet>
  </v-container>
</template>

<script>
import points from "./points";

export default {
  props: ["route"],
  components: {
    points
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: "One", content: "Tab 1 Content" },
        { tab: "Two", content: "Tab 2 Content" }
      ],
      page: 1,
      page_count: 10,
      list: [],
      api: "//hn.algolia.com/api/v1/search_by_date?tags=story"
    };
  },
  methods: {
    infiniteHandler($state) {
      // this.$http.get(
      //   `${this.$url}/api/stops?page=${instance.page}&page_count=${instance.page_count}&route_id=${}`
      // );

      if (this.list.length > 200) {
        $state.complete();
      } else {
        setTimeout(() => {
          var temp = [];
          for (var i = this.list.length; i <= this.list.length + 10; i++) {
            temp.push(i);
          }

          this.list.push(...temp);
          $state.loaded();
        }, 1000);
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.list {
  height: 60vh;
  overflow: auto;
}
</style>
