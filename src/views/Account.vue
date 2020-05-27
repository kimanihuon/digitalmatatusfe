<template>
  <v-container>
    <v-row no-gutters justify="space-around">
      <!-- User details -->
      <v-col cols="12" sm="12" md="7" class="pa-0 mt-4 mb-2">
        <v-card class="px-3" shaped elevation="10">
          <v-form v-model="valid">
            <v-col>
              <!-- Profile edit -->
              <v-row>
                <v-card-subtitle class="font-weight-medium">Edit profile</v-card-subtitle>
              </v-row>

              <!-- First row names -->
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="firstname"
                    :rules="nameRules"
                    :counter="10"
                    required
                    outlined
                    dense
                    append-icon="mdi-account-box-outline"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="phone"
                    :rules="nameRules"
                    :counter="10"
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
                    required
                    outlined
                    dense
                    color="blue"
                    append-icon="mdi-tag-heart"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- Text area -->
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-textarea label="About" v-model="about" outlined background-color="#E3F2FD"></v-textarea>
                </v-col>
              </v-row>

              <v-divider></v-divider>

              <!-- Save button -->
              <v-row>
                <v-col class="mt-2" align="end">
                  <v-btn color="primary">
                    <v-icon left>mdi-content-save</v-icon>save
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
                    <v-img src="@/assets/user.svg"></v-img>
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

              <v-card-subtitle class="pb-0 title">{{ firstname }}</v-card-subtitle>

              <v-card-subtitle class="pt-1 subtitle-1">{{ tagline }}</v-card-subtitle>
              <v-card-text>{{ about }}</v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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

  data: () => ({
    hover: false,
    valid: false,
    firstname: "Ellon Musk",
    phone: "0700000000",
    tagline: "Best of myself",
    about: "Very cool user",
    nameRules: [
      v => !!v || "Name is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    email: "boom",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>

<style lang="scss" scoped>
.img {
  border-radius: 1.5%;
}
</style>