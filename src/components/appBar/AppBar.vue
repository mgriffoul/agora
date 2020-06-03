<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title @click="redirectToHome" class="home-logo">
      Agora
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu bottom left nudge-bottom="60" min-width="300">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          icon
          v-on="on"
        >
          <v-icon large >
            mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="route(item.path)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  data: () => ({
    items: [
      { title: 'My Account', path: '/account' }
    ]
  }),
  methods: {
    route: function (path) {
      if (path) {
        this.$router.push(path)
      }
    },
    redirectToHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  .home-logo:hover {
    cursor: pointer;
  }
</style>
