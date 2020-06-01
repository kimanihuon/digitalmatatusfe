<template>
  <v-card outlined class="mx-auto" max-width="1200">

    <v-card-subtitle class="pa-0 px-4 pt-2"> Favourites </v-card-subtitle>

    <v-slide-group v-model="model" :show-arrows="true">
      <!-- Next Icon -->
      <template v-slot:next class="px-0">
        <v-btn icon>
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </template>

      <!-- Previous Icon -->
      <template v-slot:prev>
        <v-btn icon>
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </template>

      <!-- Slide item -->
      <v-slide-item v-for="(route, i) in routes" :key="i"  v-slot:default="{ active, toggle }">
        <v-card flat width="250" @click="toggle">
          <block :route="route" @activate="popup(...arguments)"> </block>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-card>
</template>



<script>
export default {
  props: ["routes"],
  components: {
    block: () => import(/* webpackChunkName: "block" */ "./block")
  },
  data: () => ({
    model: []
  }),
  methods: {
    popup(args) {
      args.page = 3;
      args.page_count = 10;
      this.$router.push({
        path: `/routes/${args.route_id}`,
        query: args
      });
    }
  }
};
</script>