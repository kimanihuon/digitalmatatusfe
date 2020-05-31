<template>
  <div>
    <v-card color="#1F7087" dark class="ma-2">
      <v-card-title class="headline">{{ route.route_short_name }}</v-card-title>

      <v-card-subtitle class="pb-0">{{ route.route_long_name }}</v-card-subtitle>

      <div class="px-4 pt-3">
        <v-divider></v-divider>
      </div>

      <v-card-actions class="py-0 justify-end" align-center>
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
