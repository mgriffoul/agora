<template>
  <div style="height: 100%">
    <v-row
      class="text-center"
      style="height: 100%"
      align="center"
      justify="center"
    >
      <v-col cols="8" sm="6" md="4" lg="3">
        <v-btn top left absolute icon v-on:click="$router.back()">
          <v-icon large color="primary darken-2"
            >mdi-arrow-collapse-left</v-icon
          >
        </v-btn>
        <div class="text-uppercase title">sign up</div>
        <v-form ref="form" v-model="validForm" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="userInfo.mail"
            @input="handleChange"
            :counter="50"
            :rules="mailRules"
            label="E-Mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="userInfo.username"
            @input="handleChange"
            :counter="25"
            :rules="nameRules"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="userInfo.password"
            @input="handleChange"
            :counter="25"
            :rules="passwordRules"
            label="Password"
            required
          ></v-text-field>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <v-btn
            :loading="loading"
            :disabled="!validForm || requestError"
            color="success"
            class="mr-4"
            type="submit"
            @click="validate"
          >
            Validate
          </v-btn>
          <v-alert
            type="error"
            v-if="serverError || requestError"
            border="left"
            color="red accent-2"
            elevation="5"
            class="mt-6"
            >{{ errorMessage }}</v-alert
          >
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import authenticationService from '../../services/authentication/authentication.service'
import { nameRules, mailRules, passwordRules } from './validationRules'

export default {
  name: 'SignUp',
  data: () => ({
    validForm: false,
    loading: false,
    serverError: false,
    requestError: false,
    errorMessage: '',
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
        .signUp(this.userInfo, this.changeErrorState, this.validAndRedirect, this.resetErrorStateErrorState)
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    validAndRedirect () {
      console.log('validAndRedirect  ')
      this.serverError = false
      this.errorMessage = false
      this.errorMessage = ''
    },
    changeErrorState (isServerInError, isRequestInError, errorMessage) {
      console.log('changeServerErrorState  ' + isServerInError + '  ' + isRequestInError + '  ' + errorMessage)
      this.serverError = isServerInError
      this.requestError = isRequestInError
      this.errorMessage = errorMessage
      if (isRequestInError) this.validForm = false
    },
    resetErrorStateErrorState () {
      console.log('validAndRedirect  ')
      this.requestError = false
      this.errorMessage = ''
      this.serverError = false
    },
    handleChange () {
      this.validForm = true
      this.requestError = false
    }
  }
}
</script>
