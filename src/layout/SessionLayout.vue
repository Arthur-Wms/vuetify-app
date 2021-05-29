<template>
  <v-layout column>
    <v-app-bar id="nav" app>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.xsOnly"
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title class="mr-3"> Title </v-toolbar-title>

      <router-link
        v-show="$vuetify.breakpoint.smAndUp"
        v-for="(route, index) in routes"
        class="mx-2"
        :key="index"
        :to="route.path"
        v-text="route.label"
      />

      <v-spacer />

      <v-btn class="mr-1" icon small @click="changeTheme()">
        <v-icon v-if="$vuetify.theme.dark">mdi-moon-waning-crescent</v-icon>
        <v-icon v-else> mdi-white-balance-sunny </v-icon>
      </v-btn>

      <v-btn icon small @click="signOut()">
        <v-icon> mdi-logout-variant </v-icon>
      </v-btn>
    </v-app-bar>

    <router-view />

    <!-- mobile drawer -->
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item
          v-for="(route, index) in routes"
          :key="index"
          :to="route.path"
        >
          <v-list-item-title v-text="route.label" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      routes: [{ label: "Main", path: "/main" }],
    };
  },

  methods: {
    ...mapActions(["setSignOut"]),

    async signOut() {
      await this.setSignOut();
      this.$router.push({ path: "/home" });
    },

    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark", this.$vuetify.theme.dark);
    },
  },
};
</script>

<style lang="scss">
#nav {
  a {
    color: #999ca1;
    text-decoration: none;
    margin: 12px;

    &.router-link-active {
      font-weight: bold;
      color: #2196f3;
    }
  }

  a:hover {
    text-decoration: underline;
  }
}
</style>
