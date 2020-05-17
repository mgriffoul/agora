<template>
  <div style="height: 100%">
    <v-row
      class="text-center"
      style="height: 100%"
      align="center"
      justify="center"
    >
      <v-col cols="8" sm="6" md="4" lg="3">
        <v-btn top left absolute icon v-on:click="$router.push('/home')">
          <v-icon large color="primary darken-2"
          >mdi-arrow-collapse-left</v-icon
          >
        </v-btn>
        <div class="text-uppercase title">sign in</div>
        <v-form ref="form" v-model="validForm" @submit.prevent="handleSubmit" data-test = "signin-form">
          <v-text-field
            data-test="mailText"
            v-model="userInfo.mail"
            @input="handleChange"
            :counter="50"
            :rules="mailRules"
            label="E-Mail"
            required
          ></v-text-field>

          <v-text-field
            data-test="passwordText"
            v-model="userInfo.password"
            @input="handleChange"
            :counter="25"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-alert
            type="error"
            v-if="serverError || requestError"
            border="left"
            color="red accent-2"
            elevation="5"
            class="error-message mt-6"
          >{{ errorMessage }}</v-alert
          >

          <v-btn
            data-test="signin-button"
            :loading="loading"
            :disabled="!validForm || requestError"
            color="success"
            class="mr-4"
            type="submit"
          >
            Validate
          </v-btn>

        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mailRules, passwordRules } from '../authenticationFormRules'
import authenticationService from '../../../services/authentication/authentication.service'

export default {
  name: 'SignIn',
  data: function () {
    return {
      userInfo: {
        mail: '',
        password: ''
      },
      loading: false,
      validForm: false,
      serverError: false,
      requestError: false,
      passwordRules: passwordRules,
      mailRules: mailRules
    }
  },
  created () {
    this.userInfo.mail = this.$store.getters.userMail
  },
  methods: {
    async handleSubmit () {
      this.loading = true
      this.serverError = false
      await authenticationService
        .signIn(this.userInfo)
        .then((data) => {
          this.registerToken(data)
          this.confirmSignIn()
        })
        .catch((error) => {
          this.loading = false
          this.changeErrorState(error?.serverError, error?.message)
        })
    },
    registerToken (token) {
      console.log('register')
      this.$store.commit('registerToken', (token.jwtToken))
    },
    handleChange () {
      this.requestError = false
    },
    confirmSignIn () {
      console.log('route')
      this.$router.push('/home')
    },
    changeErrorState (isServerInError, errorMessage) {
      if (isServerInError) {
        errorMessage = 'Oups... Désolé. Un problème technique est survenu, veuillez réessayer ultérieurement.'
      }
      this.serverError = isServerInError
      this.requestError = !isServerInError
      this.errorMessage = errorMessage
    }
  }
}
</script>
