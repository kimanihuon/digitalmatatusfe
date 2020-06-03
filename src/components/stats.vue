<template>
  <v-card outlined class="mx-auto" max-width="1200">
    <v-card-subtitle class="pa-0 px-4 pt-2">Summaries</v-card-subtitle>

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
      <v-slide-item v-for="(stat, i) in summaries" :key="i" v-slot:default="{ active, toggle }">
        <v-card class="mx-auto my-3" width="250" elevation="1" @click="toggle" outlined>
          <v-row no-gutters class="my-4 pb-0">
            <v-col class="pb-0 mb-0">
              <v-card
                class="d-flex justify-center snap ml-4"
                height="80"
                width="80"
                :color="stat.color"
              >
                <v-icon large color="black"> {{ stat.icon }} </v-icon>
              </v-card>
            </v-col>
            <v-col align="right">
              <v-card-subtitle
                class="pa-0 pr-4 font-weight-light body-1"
              >{{ stat.title }}</v-card-subtitle>
              <v-card-subtitle class="pt-1 headline pb-0">{{ stat.data.total }}</v-card-subtitle>
            </v-col>
          </v-row>

          <!-- Divider -->
          <v-divider class="mb-4 mx-4"></v-divider>

          <v-row no-gutters>
            <v-card-text class="pt-0 font-italic font-weight-light">
              <v-icon small>mdi-clock-outline</v-icon>updated now
            </v-card-text>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-card>
</template>

<script>
export default {
  props: ["stats"],

  data() {
    return {
      model: [],
      summaries: [
        {
          title: "Routes",
          data: { total: this.stats.routes.total_routes },
          icon: "mdi-routes",
          color: "#2196F3"
        },
        {
          title: "Stops",
          data: { total: this.stats.routes.total_stops },
          icon: "mdi-bus-stop",
          color: "#795548"
        },
        {
          title: "Contributions",
          data: { total: this.stats.contributions.total },
          icon: "mdi-handshake",
          color: "#FF9800"
        }
      ]
    };
  },
  methods: {}
};
</script>