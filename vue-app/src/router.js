import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import WebinarPage from './views/WebinarPage.vue'
import WebinarEditPage from './views/WebinarEditPage.vue'
import PollEditPage from './views/PollEditPage.vue'

import store from './store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
        path: '/webinar/new',
        name: 'WebinarNewPage',
        component: WebinarEditPage,
        props: { editMode: false }
    },
    {
      path: '/webinar/:webinarId',
      name: 'WebinarPage',
      component: WebinarPage
    },
    {
      path: '/webinar/:webinarId/edit',
      name: 'WebinarEditPage',
      component: WebinarEditPage,
      props: { editMode: true }
    },
    {
      path: '/webinar/:webinarId/poll/new',
      name: 'PollNewPage',
      component: PollEditPage
    },
    {
      path: '/webinar/:webinarId/poll/:pollId/edit',
      name: 'PollEditPage',
      component: PollEditPage,
      props: { editMode: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.getters['UserProfile/authState'] === false) {
    window.location.replace('/users/login')
  } else {
    next()
  }
})

export default router
