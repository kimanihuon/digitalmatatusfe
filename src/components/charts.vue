<template>
  <v-card outlined class="mx-auto" max-width="1200">
    <v-card-subtitle class="pa-0 px-4 pt-2">Charts (Demo) Dummy data</v-card-subtitle>

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
      <v-slide-item v-for="(chart, i) in charts" :key="i" v-slot:default="{ active, toggle }">
        <v-card class="mx-auto my-3 mx-4 pa-2" width="400" elevation="1" @click="toggle" outlined>
          <canvas :id="chart.title" width="200" height="130"></canvas>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-card>

</template>

<script>
// Import chart js
import Chart from "chart.js/dist/Chart.min.js";

// Import Data handler
import Data from "../controllers/chart-data";

// Initialize data
var oneChartData = new Data(1, 'Weekly distribution (Route 1)');
var twoChartData = new Data(1, 'Weekly distribution (Route 2)');

// Get data
oneChartData = oneChartData.datasetOne();
twoChartData = twoChartData.datasetTwo();

export default {
  data() {
    return {
      oneChartData: oneChartData,
      twoChartData: twoChartData,
      model: [],
      charts: [
        { title: "Route 1", source: "oneChartData" },
        { title: "Route 2", source: "twoChartData" }
      ]
    };
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      // eslint-disable-next-line
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    for (let i = 0; i < this.charts.length; i++) {
      this.createChart(this.charts[i].title, this[this.charts[i].source]);
    }
  }
};
</script>
