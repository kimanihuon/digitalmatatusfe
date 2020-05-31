<template>
  <v-sheet class="mx-auto" elevation="10" max-width="800">
    <v-slide-group class="px-4" show-arrows>
      <v-slide-item v-for="n in 15" :key="n">
        <v-card
          color="primary"
          class="ma-4"
          height="200"
          width="100"
        >
        {{ n }}
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    
  })
};
</script>