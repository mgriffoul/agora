import Store from '../store'
import Cookies from 'js-cookie'

const BEFORE_ENTER = (to, from, next) => {
  const tokenStore = Store.getters.token
  const cookieToken = Cookies.get('Authorization')
  const isAuthenticated = tokenStore || cookieToken

  if (!isAuthenticated) next({ path: '/signin' })
  else if (!tokenStore && cookieToken) Store.commit('registerToken', cookieToken)
  else if (!cookieToken && tokenStore) Cookies.set('Authorization', tokenStore)
  else next()
}

export { BEFORE_ENTER }
