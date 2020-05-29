<template>
  <v-container>
    <!-- Main login form -->
    <div v-if="!auth">
      <!-- Warning message -->
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-text class="pt-4 red--text">
            Ooops! Something happened. Please try again.
            Error: {{ requestResponse }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon color="red darken-1" text @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Main input form -->
      <v-card class="mx-auto" width="420" height="590" elevation="10">
        <!-- Banner -->
        <v-toolbar :color="color" dark flat class="d-flex justify-center">
          <v-toolbar-title>DIGITMATT</v-toolbar-title>
        </v-toolbar>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row no-gutters class="px-6 pt-6">
            <!-- Email -->
            <v-col cols="12" class="mt-2">
              <v-text-field
                :rules="emailRules"
                v-model="email"
                label="email"
                outlined
                type="email"
                prepend-inner-icon="mdi-email"
              ></v-text-field>
            </v-col>

            <!-- Full Names -->
            <v-col cols="12" :class=" signup ? 'email' : 'emailhide' ">
              <v-text-field
                :rules="signup ? nameRules : []"
                v-model="name"
                label="Name"
                type
                outlined
                prepend-inner-icon="mdi-account"
              ></v-text-field>
            </v-col>

            <!-- Password -->
            <v-col cols="12" :class="signup ? 'move' : 'moveback'">
              <v-text-field
                label="Password"
                required
                outlined
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-inner-icon="mdi-lock"
                :rules="[rules.required, rules.min]"
                :type="show ? 'text' : 'password'"
                name="input-10-1"
                hint="At least 8 characters"
                counter
                @click:append="show = !show"
              ></v-text-field>
            </v-col>

            <!-- remember me -->
            <v-col cols="6" :class="signup ? 'move' : 'moveback'">
              <v-checkbox v-model="custom" label="Remember me" class="pa-0 ma-0 pt-2"></v-checkbox>
            </v-col>

            <!-- Forgot password -->
            <v-col cols="6" align="right" :class="signup ? 'move' : 'moveback'">
              <p class="pa-0 ma-0 pt-2">
                <a href="#">Forgot password</a>
              </p>
            </v-col>

            <!-- Sign in button -->
            <v-col cols="4" align="start" justify="center" class="pt-4">
              <!-- Sign In button -->
              <v-btn
                :class=" signup ? 'move login' : (loginLoading ? 'moveback login glow' :'moveback login') "
                rounded
                :disabled="loginLoading || registerLoading"
                :color="signup ? 'grey' : color"
                @click=" signup ? signup = false : login() "
              >Sign In</v-btn>
            </v-col>

            <!-- Loading -->
            <v-col cols="4" align="center" justify="center" class="py-4">
              <!-- Loading animation -->
              <div
                :class=" loginLoading ? 'lds-ellipsis movebackLoading' : (registerLoading ? 'lds-ellipsis movebackLoadingReg' : 'd-none')"
              >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </v-col>

            <!-- Sign up button -->
            <v-col cols="4" align="end" class="pt-4 register">
              <v-btn
                :class="signup ? (registerLoading ? 'move register glow' : 'move register') : 'moveback register'"
                rounded
                :disabled="loginLoading || registerLoading"
                :color="signup ? color : 'grey' "
                @click=" signup ? register() : signup = true "
              >Sign Up</v-btn>
            </v-col>
          </v-row>
        </v-form>

        <v-col align="center" class="mt-3">
          <div>
            <GoogleLogin
              id="my-signin2"
              :params="params"
              :onSuccess="onSuccess"
              :onFailure="onFailure"
            >
              <v-img src="@/assets/gs.png" max-width="190"></v-img>
            </GoogleLogin>
          </div>
        </v-col>
      </v-card>
    </div>

    <!-- Image for when logged in -->
    <v-row v-if="auth" no-gutters>
      <v-col justify="center" align="center">
        <div>
          <v-img src="@/assets/button.svg" alt="Logged in" class="img" width="200"></v-img>
          <p class="display-2 py-2">Logged In</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>

export default {
  name: "login",

  props: ["contribution"],

  components: {
    'GoogleLogin': () => import(/* webpackChunkName: "GoogleLogin" */ "vue-google-login")
  },

  metaInfo() {
    return {
      title: "Login",
      titleTemplate: "%s | Digitmatt login page",
      meta: [
        { charset: "utf-8" },
        { name: "description", content: "Weskool Login" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ]
    };
  },

  data() {
    return {
      dialog: false,
      requestSuccess: null,
      params: {
        client_id: this.$client_id
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      },
      color: "indigo",
      requestResponse: null,
      loginLoading: false,
      registerLoading: false,
      valid: true,
      custom: true,
      signup: false,
      name: "",
      nameRules: [
        v => !!v || "Details required",
        v => (v && v.length <= 30) || "Too long",
        v => (v && v.length >= 3) || "Too short"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      show: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters"
      }
    };
  },

  computed: {
    auth() {
      return this.$store.state.auth;
    }
  },

  methods: {
    log() {},

    login() {
      // Start loading
      this.loginLoading = true;
      this.requestResponse = null;
      this.requestSuccess = null;

      if (!this.$refs.form.validate()) {
        // Stop loader
        this.loginLoading = false;
        return;
      }

      var instance = this;
      // Solves problem of invalid csrf token using: withCredentials: true
      this.$http
        .create({ withCredentials: true })
        .post(`${this.$auth}/api/login`, {
          email: this.email,
          password: this.password
        })
        .then(
          response => {
            instance.loginLoading = false;
            instance.requestSuccess = response.data.success;
            instance.requestResponse = response.data.message;

            if (response.data.success) {
              // console.log(response.data.user)
              instance.$store.commit("switchAuth", true);
              instance.$store.commit("setUserDetails", response.data.user);

              if (instance.contribution) {
                instance.$emit("success", true);
              }
            } else {
              instance.dialog = true;
            }

            // console.log(response);
          },
          err => {
            instance.loginLoading = false;
            instance.requestSuccess = false;
            instance.requestResponse = err;
            instance.dialog = true;
            console.log(err);
          }
        );
    },

    onSuccess(googleUser) {
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },

    onFailure(fail) {
      console.log(fail);
    },

    register() {
      // Start loading
      this.registerLoading = true;
      this.requestResponse = null;
      this.requestSuccess = null;

      if (!this.$refs.form.validate()) {
        // Stop loader
        this.registerLoading = false;
        return;
      }

      var instance = this;

      this.$http
        .create({ withCredentials: true })
        .post(`${this.$auth}/api/register`, {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(
          response => {
            instance.registerLoading = false;
            instance.requestSuccess = response.data.success;
            instance.requestResponse = response.data.message;

            if (response.data.success) {
              instance.$store.commit("switchAuth", true);
              instance.$store.commit("setUserDetails", response.data.user);
              
              if (instance.contribution) {
                instance.$emit("success", true);
              }
            }
            // console.log(response);
          },
          err => {
            instance.registerLoading = false;
            instance.requestSuccess = false;
            instance.requestResponse = "Server error occurred";
            instance.dialog = true;
            console.log(err);
          }
        );
    }
  },

  created() {}
};
</script>


<style lang="scss" scoped>
$move: 0.65s;

.login,
.register,
.social {
  -webkit-transition: background-color 1s;
  -ms-transition: background-color 1s;
  transition: background-color 1s;
}

.email {
  opacity: 1;
  transition: all $move ease-in-out;
  transition-delay: 0.3s;
}

.emailhide {
  opacity: 0;
  transition: all $move ease-in-out;
}

.moveback {
  transform: translateY(-85px);
  transition: all $move ease-in-out;
}

// Animated Icon at login position
.movebackLoading {
  transform: translateY(-100px);
  transition: all $move ease-in-out;
}

// Animated icon at register position
.movebackLoadingReg {
  transform: translateY(-20px);
  transition: all $move ease-in-out;
}

.move {
  transition: all $move ease-in-out;
}

// Button animation
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: #fff;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

// GLOWING EFFECT
.glow {
  box-shadow: 0px 0px 20px 2px rgb(0, 195, 255);
  /* in order: x offset, y offset, blur size, spread size, color */
  /* blur size and spread size are optional (they default to 0) */
}
</style>