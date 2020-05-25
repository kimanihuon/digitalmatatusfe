<template>
  <v-container>
    <v-row no-gutters class="px-2">
      <v-col cols="6" sm="6" md="6">

        <!-- Timeline -->
        <v-row no-gutters align="center">
          <v-icon color="blue" class="pl-3">{{ icons[1].name }}</v-icon>
          <v-divider class="mx-2"></v-divider>
          <v-icon color="blue" class="pr-3">{{ icons[1].name }}</v-icon>
        </v-row>

        <!-- Stop names -->
        <v-row no-gutters justify="space-around" class="py-1">
          <v-col align="start">
            <p> {{ start_point.trip_headsign }} </p>
          </v-col>
          <v-col align="end">
            <p> {{ stop.stop_name }} </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["start_point", "stop"],

  data() {
    return {
      icons: [
        { name: "mdi-checkbox-blank-circle" },
        { name: "mdi-circle-slice-8" },
        { name: "mdi-checkbox-blank-circle-outline" }
      ]
    };
  },

  mounted() {
    
  }

};
</script>
