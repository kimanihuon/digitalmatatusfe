<template>
  <v-container>
    <div>
      <login />
    </div>
  </v-container>
</template>

<script>

export default {
  name: "Login",
  components: {
    'login': () => import(/* webpackChunkName: "login" */ "@/components/login")
  }
};
</script>