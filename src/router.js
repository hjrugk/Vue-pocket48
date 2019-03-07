import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/music',
      name: 'music',
      component: () => import('./components/discovery/music.vue')
    },
    {
      path: '/roomlist',
      name: 'roomlist',
      component: () => import('./components/room/roomlist.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/user/login.vue')
    },
    {
      path: '/roommsg/:id',
      name: 'roommsg',
      component: () => import('./components/room/roommsg.vue')
    },
    {
      path: '/home/groupinfo',
      name: 'groupinfo',
      component: () => import('./components/infomation/groupinfo.vue'),
      children: [{
        path: 'memberlist/:group',
        name: 'memberlist',
        component: () => import('./components/infomation/memberlist.vue')
      }, ]
    },
    {
      path: '/home/memberlive/:id',
      name: 'memberlive',
      component: () => import('./components/live/memberlive.vue')
    },
    {
      path: '/home/memberdetail/:id',
      name: 'memberdetail',
      component: () => import('./components/infomation/memberdetail.vue')
    },
    {
      path: '/home/openlive/:id',
      name: 'openlive',
      component: () => import('./components/live/openlive.vue')
    },
    {
      path: '/home/livepage/:id',
      name: 'livepage',
      component: () => import('./components/live/livepage.vue')
    },
    {
      path: '/userinfo/:id',
      name: 'userinfo',
      component: () => import('./components/user/userInfo.vue')
    }
  ]
})