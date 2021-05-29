<template>
  <v-app>
    <loader-page v-if="loading" />

    <Layout v-else-if="!$store.getters.authenticated" />

    <SessionLayout v-else />
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import { loadSession } from "@/services/auth";
import { api } from "@/services";
import Layout from "@/layout/Layout";
import SessionLayout from "@/layout/SessionLayout";

export default {
  components: {
    Layout,
    SessionLayout,
  },

  data() {
    return {
      loading: true,
    };
  },

  created() {
    this.startApp();
  },

  beforeMount() {
    this.startTheme();
  },

  methods: {
    ...mapActions(["setSignIn", "setSignOut"]),

    async startApp() {
      // checks if the token is still valid for a session
      const token = localStorage.getItem("token");

      try {
        if (token) {
          api.defaults.headers.common["Authorization"] = token;

          await loadSession().then((res) => {
            this.setSignIn({
              token: res.body.token,
              user: res.body.user,
            });
          });

          this.$router.push("/main");
        }
      } catch (err) {
        this.setSignOut();
      } finally {
        setInterval(() => {
          this.loading = false;
        }, 1000);
      }
    },

    startTheme() {
      const dark = localStorage.getItem("dark");
      this.$vuetify.theme.dark = dark == "true" || false;
    },
  },
};
</script>

<style lang="scss">
</style>