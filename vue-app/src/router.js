import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import WebinarPage from './views/WebinarPage.vue'
import WebinarEditPage from './views/WebinarEditPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
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
      path: '/webinar/new',
      name: 'WebinarNewPage',
      component: WebinarEditPage,
      props: { editMode: false }
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