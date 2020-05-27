<template>
  <div>
    <!-- Main -->
    <v-row no-gutters align="center" justify="center">
      <!-- Size control -->
      <v-col cols="6" sm="4" md="4">
        <!-- Field and icon align -->
        <v-row no-gutters align="start">
          <v-col>
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
            ></v-text-field>
          </v-col>

          <v-col v-if="!changed">
            <v-btn color="primary" icon outlined small dark @click="toggle()">
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="7" v-if="changed" align="end">
            <v-btn color="#1B5E20" class="ml-1 my-1" icon outlined small dark @click="submit()">
              <v-icon small>mdi-upload-outline</v-icon>
            </v-btn>
            <v-btn color="#B71C1C" class="ml-1" icon outlined small dark @click="discard()">
              <v-icon small>mdi-cancel</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["fare"],

  data() {
    return {
      edit: false,
      changed: false,
      val: this.fare ? this.fare.price : 0,
      oldVal: 0,
      min: 0,
      max: 300
    };
  },

  methods: {
    toggle() {
      this.edit = !this.edit;
    },
    submit() {
      this.val = this.oldVal;
      this.changed = false;
      this.edit = !this.edit;
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
    }
  },
  mounted() {},
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
