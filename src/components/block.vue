<template>
  <div>
    <v-card color="#1F7087" dark class="ma-2" elevation="5">
      <v-card-title class="headline">{{ route.route_short_name }}</v-card-title>

      <v-card-subtitle class="pb-0">{{ route.route_long_name }}</v-card-subtitle>

      <div class="px-4 py-2">
        <v-divider></v-divider>
      </div>
      
      <!-- Max fare -->
      <v-row no-gutters align="center" class="pa-0 ma-0" >
        <v-card-subtitle class="py-0 pr-0">MAX fare:</v-card-subtitle>
        <v-card-title class="pa-0"> <span class="fare cash"> {{ route.max_fare }} </span></v-card-title>
      </v-row>

      <!-- Min fare -->
      <v-row no-gutters align="center" >
        <v-card-subtitle class="py-0 pr-0">MIN fare:</v-card-subtitle>
        <v-card-title class="pa-0"> <span class="fare cash"> {{ route.min_fare }} </span></v-card-title>
      </v-row>

      <div class="px-4 pt-2">
        <v-divider></v-divider>
      </div>

      <v-card-actions class="py-0 justify-center" align-center>
        <v-btn icon @click="clicked()">
          <v-icon>
            mdi-eye-outline
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["route"],

  data() {
    return {};
  },
  methods: {
    clicked() {
      this.$emit('activate', this.route);
      // this.$router.push({ name: 'single_route', params: {route_id: 1 } })
    }
  }
};
</script>

<style scoped>
.fare{
  white-space: pre-wrap;
  font-size: 24px;
}
</style>
