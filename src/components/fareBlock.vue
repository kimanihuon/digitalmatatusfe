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
          <v-card-subtitle v-if="!sendingContribution && sentContribution" class="subtitle-1">Thank you for your submission. The fare will be reviewed and updated</v-card-subtitle>
          <v-card-subtitle v-if="!sendingContribution && !sentContribution" class="subtitle-1 red--text"> Ooops !!! Something happened when submitting. Please try again </v-card-subtitle>

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
            <p v-if="!edit" class="headline">{{ val }}</p>
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
import login from "../components/login";
import loader from "./circularIndicator";

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

export default {
  props: ["stop_id", "fare", "route_id", "start_point_id", "period"],

  components: {
    login,
    loader
  },

  data() {
    return {
      edit: false,
      changed: false,
      val: this.fare ? this.fare.price : 0,
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
  mounted() {
    // console.log(this.start_point_id)
    // console.log(this.stop_id)
    // console.log(this.fare)
    // console.log(this.route_id)
  },
  watch: {
    fare: {
      deep: true,
      handler(change) {
        this.val = change ? change.price : 0;
      }
    }
  }
};
</script>

<style>
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
