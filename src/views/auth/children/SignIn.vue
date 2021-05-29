  
  <template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8" lg="5" xl="4">
      <v-card>
        <v-card-title>
          <v-icon left @click="$router.push({ path: '/home' })"
            >mdi-arrow-left</v-icon
          >

          Sign In
        </v-card-title>

        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field
              v-model="form.username"
              label="Username"
              :rules="rule"
            />

            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              :rules="rule"
            />

            <v-btn class="my-3" color="accent" block @click="submit()">
              Submit
            </v-btn>
          </v-form>

          <div align="center">
            Don't have an account?
            <a
              class="accent--text decoration"
              @click="$router.push({ path: '/auth/sign-up' })"
            >
              Sign Up
            </a>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <loader-hover v-if="loading" />
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import { signIn } from "@/services/auth";

export default {
  data() {
    return {
      loading: false,
      valid: false,
      form: {
        username: "",
        password: "",
      },
    };
  },

  computed: {
    rule() {
      return [(v) => !!v || "Required field"];
    },
  },

  methods: {
    ...mapActions(["setSignIn"]),

    async submit() {
      if (!this.$refs.form.validate()) return;

      try {
        this.loading = true;

        await signIn(this.form).then((res) => {
          this.setSignIn({
            user: res.body.user,
            token: res.body.token,
          });
        });
      } catch (err) {
        console.log(err);
        alert("Failed to send request");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
</style>