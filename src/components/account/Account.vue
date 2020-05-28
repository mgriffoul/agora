<template>
  <div>
    {{message}}
    <v-form ref="form" @submit.prevent="handleClick">
      <v-btn
        data-test="signin-button"
        color="success"
        class="mr-4"
        type="submit"
      >PING</v-btn>
    </v-form>
  </div>
</template>

<script>
import userService from '../../../src/services/user/userService'

export default {
  name: 'Account',
  data: function () {
    return {
      message: 'start'
    }
  },
  methods: {
    setStart: function () {
      this.message = 'after'
    },
    async handleClick () {
      await userService.getUser()
        .then((data) => {
          console.log(data)
          this.message = data
        })
        .catch((data) => {
          console.log(data)
          this.message = data
        })
    }
  }
}
</script>
