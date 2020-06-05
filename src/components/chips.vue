<template>
  <v-container>
    <v-sheet class="mx-auto py-4" elevation="5" max-width="600">
      <v-chip-group v-model="selection" show-arrows mandatory active-class="primary--text">
        <v-chip v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
        <v-progress-linear
          :active="fetching_fares"
          :indeterminate="fetching_fares"
          absolute
          bottom
          color="deep-purple accent-4"
        ></v-progress-linear>
      </v-chip-group>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      tags: this.$store.state.periods.tags,
    };
  },
  computed: {
    ...mapGetters({
      fetching_fares: "getFetchingFares"
    }),
    selection: {
      get() {
        return this.$store.state.periods.selection;
      },
      set(value) {
        this.$store.commit("updateSelection", value);
      }
    }
  },
  methods: {},
  mounted() {},
};
</script>