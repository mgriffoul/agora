<template>
  <v-app>
    <AppBar/>
    <v-content >
      <router-view>
        <SignUp/>
      </router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from '@/components/appBar/AppBar.vue'
import SignUp from './components/signup/SignUp'

export default {
  name: 'App',

  components: {
    SignUp,
    AppBar
  },

  data: () => ({
    //
  })
}
</script>
