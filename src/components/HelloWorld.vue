<template>
  <v-container>
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
