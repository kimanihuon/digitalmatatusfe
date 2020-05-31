import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
// import SingleRoute from "../views/SingleRoute"

Vue.use(VueMeta, {
  keyName: 'metaInfo',
  refreshOnceOnNavigation: true
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    name: 'routes',
    path: '/routes',
    component: () => import(/* webpackChunkName: "routes" */ '../views/Routes.vue'),
    children: [
      {
        name: 'single_route',
        path: '/routes/:route_short_name',
        component: () => import(/* webpackChunkName: "routes" */ '../views/SingleRoute.vue'),
        props: true
      },
    ]
  },



  {
    path: '/account',
    name: 'account',
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

router.beforeEach((to, from, next) => {
  next()
})

export default router
