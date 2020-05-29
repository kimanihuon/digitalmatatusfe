<template>
  <v-container>
    <div>
      <login />
    </div>
  </v-container>
</template>

<script>

export default {
  components: {
    login: import(/* webpackChunkName: "loginComponent" */ '../components/login.vue')
  }
};
</script>