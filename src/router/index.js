import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem('user-token')) {
    next();
    return;
  }
  next('/auth');
}

const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem('user-token')) {
    next();
    return;
  }
  next('/');
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    beforeEnter: ifNotAuthenticated
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
