<template>
  <v-app>
    <v-content class="bak">
      <Nav />
      <transition
        name="router-anim"
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutDown"
      >
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  components: {
    Nav: () => import(/* webpackChunkName: "Nav" */ "./components/nav")
  },
  data() {
    return {
      darkmode: false
    }
  },
  mounted(){
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "switchTheme") {
        this.$vuetify.theme.dark = state.darkmode;
      }
    });
  }
};
</script>


<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

.cash {
  font-family: 'Lobster', cursive;
  font-size: 27px;
}

.bak{
  background-color: rgba(151, 152, 153, 0.3);
}
</style>
