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
        <div class="text-uppercase title">sign up</div>
        <v-form ref="form" v-model="validForm" @submit.prevent="handleSubmit" data-test = "signup-form">
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
            data-test="usernameText"
            v-model="userInfo.username"
            @input="handleChange"
            :counter="25"
            :rules="nameRules"
            label="Username"
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

          <v-checkbox
            data-test="signup-agreement"
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <v-btn
            data-test="signup-button"
            :loading="loading"
            :disabled="!validForm || requestError"
            color="success"
            class="mr-4"
            type="submit"
            @click="validate"
          >
            Validate
          </v-btn>

        </v-form>
      </v-col>
    </v-row>
    <ConfirmationModal :should-display-dialog="displayDialog" v-on:confirm="redirectToLogin"/>
  </div>
</template>

<script>
import authenticationService from '../../../services/authentication/authentication.service'
import { nameRules, mailRules, passwordRules } from '../authenticationFormRules'
import ConfirmationModal from '../confirmation/ConfirmationModal'

export default {
  name: 'SignUp',
  components: { ConfirmationModal },
  data: () => ({
    validForm: false,
    loading: false,
    serverError: false,
    requestError: false,
    errorMessage: '',
    displayDialog: false,
    userInfo: {
      username: '',
      password: '',
      mail: ''
    },
    checkbox: false,
    nameRules: nameRules,
    passwordRules: passwordRules,
    mailRules: mailRules,
    justifyAvailable: ['center']
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
      this.errorMessage = ''
    },
    async handleSubmit () {
      this.loading = true
      this.serverError = false
      await authenticationService
        .signUp(this.userInfo)
        .then((data) => {
          this.storeUser(data)
          this.confirmSignUp()
        })
        .catch((error) => {
          this.loading = false
          this.changeErrorState(error?.serverError, error?.message)
        })
    },
    storeUser (user) {
      const authentication = {
        token: user?.jwtToken,
        user: {
          username: user?.signedUpUser?.username,
          mail: user?.signedUpUser?.mail
        }
      }
      this.$store.commit('logUser', (authentication))
    },
    confirmSignUp () {
      this.resetErrorState()
      this.serverError = false
      this.errorMessage = false
      this.errorMessage = ''
      this.displayDialog = true
    },
    changeErrorState (isServerInError, errorMessage) {
      if (isServerInError) {
        errorMessage = 'Oups... Désolé. Un problème technique est survenu, veuillez réessayer ultérieurement.'
      }
      this.serverError = isServerInError
      this.requestError = !isServerInError
      this.errorMessage = errorMessage
    },
    resetErrorState () {
      this.loading = false
      this.requestError = false
      this.errorMessage = ''
      this.serverError = false
    },
    handleChange () {
      this.requestError = false
    },
    redirectToLogin () {
      this.$router.push('signin')
    }
  }
}
</script>
