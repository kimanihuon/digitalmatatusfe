import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
  keyName: 'metaInfo',
  refreshOnceOnNavigation: true
})

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/routes',
    name: 'Routes',
    component: () => import(/* webpackChunkName: "routes" */ '../views/Routes.vue'),
    props: true
  },

  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  saveScrollPosition: true,
  routes
})

export default router
