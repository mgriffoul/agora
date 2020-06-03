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
        <div class="text-uppercase title">Your account</div>
        <v-form ref="form" v-model="validForm" @submit.prevent="loadUser" data-test = "signup-form">
          <v-text-field
            data-test="mailText"
            v-model="user.mail"
            @input="handleChange"
            :counter="counter"
            :rules="mailRules"
            label="E-Mail"
            v-bind:disabled=!modifying
            required
          ></v-text-field>

          <v-text-field
            data-test="usernameText"
            v-model="user.username"
            @input="handleChange"
            :counter="counter"
            :rules="nameRules"
            label="Username"
            v-bind:disabled=!modifying
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
          <v-row justify="center" class="mt-4">
              <v-btn v-show="modifying"
                     data-test="signup-button"
                     :loading="loading"
                     color="primary"
                     @click="updateUser"
                     width="80"
              >
                valid
              </v-btn>
            </v-row>
          <v-row justify="center" class="mt-4">
            <v-btn v-show="modifying"
                   data-test="signup-button"
                   :loading="loading"
                   color="grey lighten-4"
                   type="submit"
                   width="80"
            >
              cancel
            </v-btn>
          </v-row>
          </v-form>
        <div class="my-2">
          <v-btn
            v-show="!modifying"
            :loading="loading"
            @click="startModifying"
            color="primary"
          >
            Modify
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import userService from '../../../src/services/user/userService'
import { mailRules, nameRules, passwordRules } from '../authentication/authenticationFormRules'

export default {
  name: 'Account',
  data: function () {
    return {
      validForm: true,
      user: {
        username: '',
        mail: ''
      },
      passwordRules: passwordRules,
      mailRules: mailRules,
      nameRules: nameRules,
      loading: false,
      serverError: false,
      requestError: false,
      errorMessage: '',
      modifying: false
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      this.errorMessage = ''
    },
    async updateUser () {
      await userService.updateUser(this.user)
        .then((data) => {
          this.modifying = false
          this.user = { ...data }
        })
        .catch((data) => {
        })
    },
    async loadUser () {
      await userService.getUser()
        .then((data) => {
          this.modifying = false
          this.user = { ...data }
        })
        .catch((data) => {
        })
    },
    handleChange () {
      this.requestError = false
    },
    startModifying () {
      this.modifying = true
    }
  },
  computed: {
    counter: function () {
      if (this.modifying) {
        return 50
      }
      return false
    }
  }
}
</script>
