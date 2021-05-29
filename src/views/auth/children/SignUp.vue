  
  <template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8" lg="5" xl="4">
      <v-card>
        <v-card-title>
          <v-icon left @click="$router.push('/auth')">mdi-arrow-left</v-icon>

          Sign Up
        </v-card-title>

        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-text-field v-model="form.name" label="Name" :rules="rule" />

            <v-text-field
              v-model="form.lastName"
              label="Last name"
              :rules="rule"
            />

            <v-text-field v-model="form.email" label="E-mail" :rules="rule" />

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
        </v-card-text>
      </v-card>
    </v-col>

    <loader-hover v-if="loading" />
  </v-row>
</template>

<script>
import { signUp } from "@/services/auth";

export default {
  data() {
    return {
      loading: false,
      valid: false,
      form: {
        name: "",
        lastName: "",
        email: "",
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
    async submit() {
      if (!this.$refs.form.validate()) return;

      try {
        this.loading = true;

        await signUp(this.form).then((res) => {
          this.$router.push({ path: "/auth" });
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