<template>
  <v-container>
    <v-row>
      <v-col cols="6" sm="4" md="3" lg="3">
        <block />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import block from "../components/block";

export default {
  name: "Home",

  components: {
    block
  },

  data() {
    return {
      page: this.$store.state.page,
      page_count: this.$store.state.page_count
    };
  },
  mounted() {

    // TODO: Make this network call asynchronous

    var instance = this;
    // Remember to include the last foward slash
    this.$http.get(`${this.$url}/api/data?page=${instance.page}&page_count=${instance.page_count}`).then(function(response) {
      instance.$store.commit("changeGTFS", {name: "routes", data: response.data.info})
      console.log('Received successfully')
    }).catch((error) => {
      console.log(error.response)
    });
  }
};
</script>
