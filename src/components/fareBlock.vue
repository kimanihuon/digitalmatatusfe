<template>
  <div>
    <!-- Login component dialog -->
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="800">
        <v-card color="grey">
          <!-- Close button -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" outlined icon @click="close()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>

          <!-- Login component -->
          <div v-if="dialog">
            <login :contribution="true" @success="loginResponse" />
          </div>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Contribution dialog -->
    <v-row justify="center">
      <v-dialog v-model="contributionDialog" persistent max-width="290">
        <v-card class="pa-2" v-if="contributionDialog">
          <v-card-subtitle
            v-if="!sendingContribution && sentContribution"
            class="subtitle-1"
          >Thank you for your submission. The fare will be reviewed and updated</v-card-subtitle>
          <v-card-subtitle
            v-if="!sendingContribution && !sentContribution"
            class="subtitle-1 red--text"
          >Ooops !!! Something happened when submitting. Please try again</v-card-subtitle>

          <v-row no-gutters v-if="sendingContribution">
            <loader />
          </v-row>

          <v-row no-gutters v-if="!sendingContribution && sentContribution ">
            <v-col align="center" justify="center">
              <v-img src="@/assets/success.svg" width="100"></v-img>
            </v-col>
          </v-row>

          <v-row no-gutters v-if="!sendingContribution && !sentContribution ">
            <v-col align="center" justify="center">
              <v-img src="@/assets/sad.svg" width="100"></v-img>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="contributionDialog = false">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- Main -->
    <v-row no-gutters align="center" justify="center">
      <!-- Size control -->
      <v-col cols="6" sm="4" md="4">
        <!-- Field and icon align -->
        <v-row no-gutters align="start">
          <v-col cols="8">
            <p v-if="!edit" class="cash">{{ val }}</p>
            <v-text-field
              v-if="edit"
              :min="min"
              :max="max"
              :oninput="`if(this.value > ${max}) this.value = ${max}; if(this.value < ${min}) this.value = ${min}`"
              v-model="val"
              @input="change()"
              @focus="focus"
              type="number"
              class="input"
              outlined
              dense
            ></v-text-field>
          </v-col>

          <v-col cols="4" v-if="!changed">
            <v-btn color="primary" class="ml-4" icon outlined small dark @click="toggle()">
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="4" v-if="changed" align="end">
            <v-btn color="#1B5E20" class="ml-4 my-1" icon outlined small dark @click="submit()">
              <v-icon small>mdi-upload-outline</v-icon>
            </v-btn>

            <v-btn color="#B71C1C" class="ml-4" icon outlined small dark @click="discard()">
              <v-icon small>mdi-cancel</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
function submitContribution(instance, submitionValue) {
  instance.$http
    .create({ withCredentials: true })
    .post(`${instance.$auth}/api/fare`, {
      origin_id: instance.start_point_id,
      destination_id: instance.stop_id,
      route_id: instance.route_id,
      period: instance.period,
      price: submitionValue
    })
    .then(
      response => {
        instance.sendingContribution = false;

        if (response.data.success) {
          instance.sentContribution = true;
          instance.sentMessage = response.data.message;
        } else {
          instance.sentContribution = false;
          instance.sentMessage = response.data.message;
        }
      },
      err => {
        instance.sentContribution = false;
        instance.sentMessage = err;
      }
    );
}

function retrieve(instance) {
  var fares = instance.$store.state.gtfs.fares[instance.start_point_id];
  var periodFares = fares ? fares[instance.period] : null;
  var stopFare = periodFares ? periodFares[instance.stop_id] : null;

  return stopFare;
}

export default {
  props: ["stop_id", "route_id", "start_point_id", "period"],

  components: {
    login: () => import(/* webpackChunkName: "login" */ "@/components/login"),
    loader: () =>
      import(
        /* webpackChunkName: "progressIndicator" */ "@/components/circularIndicator"
      )
  },

  data() {
    var stopFare = retrieve(this);

    return {
      edit: false,
      changed: false,
      val: stopFare ? stopFare.price : 0,
      oldVal: 0,
      min: 0,
      max: 300,
      dialog: false,
      submitionValue: 111,
      contributionDialog: false,
      sendingContribution: false,
      sentContribution: false,
      sentMessage: ""
    };
  },

  computed: {},

  methods: {
    toggle() {
      this.edit = !this.edit;
    },
    submit() {
      this.submitionValue = this.val;
      this.val = this.oldVal;
      this.changed = false;
      this.edit = !this.edit;

      if (!this.$store.state.auth) {
        this.dialog = true;
      } else {
        this.contributionDialog = true;
        this.sendingContribution = true;
        submitContribution(this, this.submitionValue);
      }
    },
    discard() {
      this.val = this.oldVal;
      this.changed = false;
      this.edit = !this.edit;
    },
    change() {
      this.changed = true;
    },
    focus() {
      this.oldVal = this.val;
    },
    close() {
      this.dialog = false;
    },
    loginResponse(success) {
      setTimeout(function() {
        this.dialog = false;
      }, 2000);

      if (success) {
        this.contributionDialog = true;
        this.sendingContribution = true;
        submitContribution(this, this.submitionValue);
      }
    }
  },
  mounted() {},

  watch: {
    "$store.state.fetching_fares": function() {
      // When the fares have been fetched
      if (!this.$store.state.fetching_fares) {
        // Retrieve latest value
        this.val = retrieve(this) ? retrieve(this).price : 0;
      }
    }
  }
};
</script>

<style scoped>

/* Chrome, Safari, Edge, Opera */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.cost {
  padding-top: 15px;
}

</style>
