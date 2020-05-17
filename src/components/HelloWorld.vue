<template>
  <v-container>

    <v-btn v-on:click="check">
      check
    </v-btn>

    {{checkMessage}}

    <v-row>
      <v-col justify="center" class="text-center" >
        <router-link to="/signin">
          <v-btn :link="true" color="primary" dark>Sign In</v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col justify="center" class="text-center" >
        <router-link to="/signup">
          <v-btn :link="true" color="primary" dark>Sign Up</v-btn>
        </router-link>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a
            href="https://community.vuetifyjs.com"
            target="_blank"
          >Discord Community</a>
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          What's next?
        </h2>

        <v-row justify="center">
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authenticationService from '../services/authentication/authentication.service'

export default {
  name: 'HelloWorld',
  methods: {
    check: function () {
      authenticationService.healthCheck().then((response) => { this.checkMessage = response })
    }
  },
  data: () => ({
    checkMessage: '',
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer'
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined'
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
      }
    ]
  })
}
</script>
