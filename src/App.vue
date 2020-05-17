<template>
  <v-app>
    <AppBar/>
    <v-content >
      <router-view>
        <SignUp/>
        <SignIn/>
      </router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/appBar/AppBar.vue'
import SignUp from './components/authentication/signup/SignUp'
import SignIn from './components/authentication/signin/SignIn'

export default {
  name: 'App',

  components: {
    SignUp,
    SignIn,
    AppBar
  },

  data: () => ({
    //
  })
}
</script>
