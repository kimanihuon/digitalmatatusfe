<template>
  <div>
    <v-app-bar app clipped-left dense :color="main_color" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Wefare</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <!-- Main routes -->
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item v-for="(page, i) in pages" :key="i" :to="page.link">
            <v-list-item-icon>
              <v-icon>{{ page.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ page.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- Logout button -->
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block outlined @click="logout()">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false
  }),
  computed: {
    pages() {
      return this.$store.state.pages;
    },
    main_color() {
      return this.$store.state.main_color;
    }
  },
  methods: {
    logout() {}
  }
};
</script>