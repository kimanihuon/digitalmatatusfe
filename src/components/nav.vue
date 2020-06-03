<template>
  <div>
    <!-- Logout dialog -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text v-if="!logoutSuccess" class="pt-4 red--text" title>
          Ooops! Something happened. Please try again.
          Error: {{ requestResponse }}
        </v-card-text>

        <v-card-subtitle v-if="logoutSuccess" class="pt-4 green--text title">
          Logout successfull.
          See you soon!!!!
        </v-card-subtitle>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon color="red darken-1" text @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-app-bar app clipped-left :color="main_color" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Digimatt</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="ma-2" outlined to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn class="ma-2" outlined to="/routes">
        <v-icon>mdi-routes</v-icon>
      </v-btn>

      <v-btn to="/account" class="ma-2" outlined>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <div>
        <v-btn icon @click="switchTheme">
          <v-icon>{{ darkmode ? lightOnIcon : lightOffIcon }}</v-icon>
        </v-btn>
      </div>
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
    drawer: false,
    dialog: false,
    lightOnIcon: "mdi-lightbulb-on",
    lightOffIcon: "mdi-lightbulb-off",
    requestResponse: "",
    logoutSuccess: false,
    darkmode: false
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
    logout() {
      var instance = this;

      this.$http
        .create({ withCredentials: true })
        .post(`${this.$auth}/api/logout`)
        .then(function(response) {
          if (response.data.success === true) {
            instance.dialog = true;
            instance.logoutSuccess = true;
            instance.$store.commit("switchAuth", false);
            instance.drawer = false;
          } else {
            this.dialog = true;
            instance.logoutSuccess = false;
            this.requestResponse =
              "Cannot logout, server configuration error. Try clearing your cookies" +
              response.data.message;
          }
        })
        .catch(function(error) {
          // console.log(error)
          error;
          this.dialog = true;
          instance.logoutSuccess = false;
          this.requestResponse =
            "Cannot logout, Browser error. Try clearing your cookies instead";
        });
    },
    switchTheme() {
      this.$store.commit("switchTheme");
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "switchTheme") {
        this.darkmode = state.darkmode;
      }
    });
  }
};
</script>