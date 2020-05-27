<template>
  <v-container>
    <v-sheet class="mx-auto py-4" elevation="5" max-width="600">
      <v-chip-group
        v-model="selection"
        show-arrows
        mandatory
        active-class="primary--text"
      >
        <v-chip v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
      </v-chip-group>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        "Current Time",
        "6:00 - 7:00",
        "7:00 - 8:00",
        "8:00 - 9:00",
        "9:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 1:00",
        "1:00 - 2:00",
        "2:00 - 3:00",
        "3:00 - 4:00",
        "4:00 - 5:00",
        "5:00 - 6:00"
      ]
    };
  },
  computed: {
    selection: {
      get() {
        return this.$store.state.periods.selection;
      },
      set(value) {
        this.$store.commit("updateSelection", value);
      }
    }
  },
  methods: {
  },
  mounted() {}
};
</script>
