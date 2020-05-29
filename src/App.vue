<template>
  <v-app>
    <v-content>
      <Nav />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  components: {
    'Nav': () => import(/* webpackChunkName: "Nav" */ "./components/nav")
  }
};
</script>

<style>
</style>
