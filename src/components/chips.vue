<template>
  <v-container>
    <v-sheet class="mx-auto" elevation="4" max-width="800">
      <v-slide-group show-arrows class="pa-4">
        <v-slide-item v-for="(option, i) in tags" :key="i" v-slot:default="{ active, toggle }">
          <v-btn
            small
            class="mx-2"
            :input-value="active"
            active-class="purple white--text"
            depressed
            rounded
            @click="toggle"
          >{{ option }}</v-btn>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tags: [
      "Off-peak",
      "Morning",
      "Afternoon",
      "Evening",
      "6:00 - 9:00",
      "9:00 - 12:00",
      "12:00 - 3:00",
      "3:00 - 6:00"
    ]
  })
};
</script>
