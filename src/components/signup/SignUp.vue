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
            :counter="50"
            :rules="mailRules"
            label="E-Mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="userInfo.username"
            :counter="25"
            :rules="nameRules"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="userInfo.password"
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
            :disabled="!validForm"
            color="success"
            class="mr-4"
            type="submit"
            @click="validate"
          >
            Validate
          </v-btn>
          <v-alert
            type="error"
            v-if="errorMessage && validForm"
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
import { getErrorMessage } from './ErrorMessageService'

export default {
  name: 'SignUp',
  data: () => ({
    validForm: true,
    userInfo: {
      username: '',
      password: '',
      mail: ''
    },
    errorMessage: '',
    checkbox: false,
    nameRules: nameRules,
    passwordRules: passwordRules,
    mailRules: mailRules,
    justifyAvailable: ['center']
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    handleSubmit () {
      console.log(this.userInfo.username)
      authenticationService
        .signUp(this.userInfo)
        .then(() => {
          this.errorMessage = ''
        })
        .catch(error => {
          console.log('ERRRRORRRRR    ' + error)
          this.errorMessage = getErrorMessage(error, this.userInfo)
        })
    }
  }
}
</script>
