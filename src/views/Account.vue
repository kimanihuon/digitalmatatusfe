<template>
  <v-container class="fill-height">
    <v-row v-if="auth" no-gutters justify="space-around">
      <!-- User details -->
      <v-col cols="12" sm="12" md="7" class="pa-0 mt-4 mb-2">
        <v-card class="px-3" shaped elevation="10">
          <v-form v-model="valid" ref="form">
            <v-col>
              <!-- Profile edit -->
              <v-row>
                <v-card-subtitle class="font-weight-medium">Edit profile</v-card-subtitle>
              </v-row>

              <!-- First row names -->
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    :counter="20"
                    required
                    outlined
                    dense
                    append-icon="mdi-account-box-outline"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="phone"
                    :rules="phoneRules"
                    :counter="13"
                    required
                    outlined
                    dense
                    append-icon="mdi-account-box-outline"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Second row E mail -->
              <v-row justify="center">
                <v-col cols="12" sm="8">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    required
                    outlined
                    disabled
                    dense
                    append-icon="mdi-email-outline"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Third row Designations -->
              <v-row justify="center">
                <v-col cols="12" md="6" class="pb-0">
                  <v-text-field
                    v-model="tagline"
                    label="Tagline"
                    :rules="taglineRules"
                    :counter="50"
                    required
                    outlined
                    dense
                    color="blue"
                    append-icon="mdi-tag-heart"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- About area -->
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-textarea
                    :rules="aboutRules"
                    :counter="100"
                    label="About"
                    v-model="about"
                    outlined
                    background-color="#E3F2FD"
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <!-- Save button -->
              <v-row>
                <v-col class="mt-2" align="center">
                  <v-btn
                    :loading="loading"
                    :color="success ? 'success' : 'primary'"
                    @click="success ? null : save()"
                  >
                    <v-icon
                      left
                    >{{ success ? 'mdi-checkbox-marked-circle-outline' : 'mdi-content-save' }}</v-icon>
                    {{ success ? 'saved' : 'save' }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-form>
        </v-card>
      </v-col>

      <!-- Profile section -->
      <v-col cols="12" sm="6" md="4" class="pa-0 mt-4 mb-2">
        <v-card elevation="10">
          <v-row no-gutters>
            <v-col align="center">
              <!-- Profile with hover effect -->
              <v-hover>
                <template v-slot:default="{ hover }">
                  <v-avatar class="profile mt-4" color="grey" size="150">
                    <v-img :src="avatar ? avatar : require('@/assets/user.svg')"></v-img>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#036358">
                        <!-- Implement picture upload -->
                        <v-btn fab text>
                          <v-icon>mdi-image-edit</v-icon>
                        </v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-avatar>
                </template>
              </v-hover>

              <v-card-subtitle class="pb-0 title">{{ name }}</v-card-subtitle>

              <v-card-subtitle class="pt-1 subtitle-1">{{ tagline }}</v-card-subtitle>
              <v-card-text>{{ about }}</v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="!auth" no-gutters justify="center">
      <v-col align="center" justify="center">
        <v-img src="@/assets/hello.svg" width="300"></v-img>
        <v-card-title class="justify-center">Please login to view profile</v-card-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "account",

  metaInfo() {
    return {
      title: "Profile",
      titleTemplate: "%s | Digitmatt profile page",
      meta: [
        { charset: "utf-8" },
        { name: "description", content: "Digimatt profile" },
        { name: "viewport", content: "width=device-width, initial-scale=1" }
      ]
    };
  },

  data() {
    return {
      userDetails: {},
      hover: false,
      valid: true,
      loading: false,
      success: false,
      auth: this.$store.state.auth,
      name: this.$store.state.userDetails.name
        ? JSON.parse(JSON.stringify(this.$store.state.userDetails.name))
        : "",
      phone: this.$store.state.userDetails.phone
        ? JSON.parse(JSON.stringify(this.$store.state.userDetails.phone))
        : "",
      avatar: this.$store.state.userDetails.avatar
        ? JSON.parse(JSON.stringify(this.$store.state.userDetails.avatar))
        : "",
      tagline: this.$store.state.userDetails.tagline
        ? JSON.parse(JSON.stringify(this.$store.state.userDetails.tagline))
        : "",
      about: this.$store.state.userDetails.about
        ? JSON.parse(JSON.stringify(this.$store.state.userDetails.about))
        : "",
      email: this.$store.state.userDetails.email
        ? JSON.parse(JSON.stringify(this.$store.state.userDetails.email))
        : "",
      taglineRules: [
        v => !!v || "Tagline is required",
        v => v.length <= 50 || "Tagline must be less than 50 characters"
      ],
      aboutRules: [
        v => !!v || "About is required",
        v => v.length <= 50 || "About must be less than 100 characters"
      ],
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 20 || "Name must be less than 20 characters"
      ],
      phoneRules: [
        v => !!v || "Phone is required",
        v => v.length <= 13 || "Phone must be less than 13 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    save() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;
      var instance = this;
      var fields = {
        name: this.name,
        tagline: this.tagline,
        phone: this.phone,
        about: this.about
      };
      this.$http
        .create({ withCredentials: true })
        .post(`${this.$auth}/api/update`, {
          fields: fields
        })
        .then(
          res => {
            instance.loading = false;
            if (res.data.success) {
              instance.$store.commit("updateProfile", fields);
              instance.success = true;
              setTimeout(function() {
                instance.success = false;
              }, 3000);
            } else {
              instance.loading = false;
              instance.dialog = true;
            }
          },
          err => {
            this.loading = false;
            this.dialog = true;
            console.log(err);
          }
        );
    }
  },
  mounted() {
    // console.log(this.$store.state.userDetails);
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "switchAuth") {
        state;
        this.auth = this.$store.state.auth;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.img {
  border-radius: 1.5%;
}
</style>