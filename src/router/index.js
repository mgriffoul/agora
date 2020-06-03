import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../components/authentication/signup/SignUp'
import SignIn from '../components/authentication/signin/SignIn'
import { BEFORE_ENTER } from './authenticationGuards'
import Account from '../components/account/Account'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    alias: '/'
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: BEFORE_ENTER
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  }
]

const router = new VueRouter({
  routes
})

export default router
