<template>
  <v-app>
    <v-content>
      <Nav />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Nav from "./components/nav";

export default {
  components: {
    Nav
  }
};
</script>

<style>
</style>
