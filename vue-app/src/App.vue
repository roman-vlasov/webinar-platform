<template>
  <div id="app">
    <div class="app-wrapper">
      <navigation-drawer
              class="app-aside-mobile"
              :user-image="userImage"
              :user-name="userName"
              :secondary-menu-items="navbarMenuItems"
              v-on:closeNavDrawer="setNavigationDrawerShow(false)"
              :show="navigationDrawerShow"/>
      <app-nav-bar :title="$titles.siteTitle"
                   class="app-nav-bar"
                   :user-image="userImage"
                   :user-name="userName"
                   :app-icon="$images.mobileLogo"
                   :menu-items="navbarMenuItems"
                   :nav-drawer-active="navigationDrawerShow"
                   :profile-path="{ name: 'Profile' }"
                   main-page-route-name="Main"
                   v-on:hamburgerClick="switchNavigationDrawerShow"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  import AppNavBar from 'Components/AppNavBar.vue'
  import NavigationDrawer from 'Components/NavigationDrawer.vue'

  export default {
    name: 'App',
    components: {
      AppNavBar,
      NavigationDrawer
    },
    created() {
      this.fetchData()
    },
    computed: {
      ...mapGetters('Navigation', [
        // 'navbarMenuItems',
        'navigationDrawerShow'
      ]),
      ...mapGetters('UserProfile', [
        'userImage',
        'userName',
        'userIsAdmin'
      ]),
      navbarMenuItems() {
        const items = [
          { title: 'Главная', path: { name: 'Main' }, hideIfCurrent: true },
        ]
        if (this.userIsAdmin) {
          items.push({ title: '+ Новый вебинар', path: { name: 'WebinarNewPage' }, hideIfCurrent: true })
        }
        return items
      }
    },
    methods: {
      ...mapActions('Navigation', [
        'setNavigationDrawerShow',
        'switchNavigationDrawerShow'
      ]),
      ...mapActions('UserProfile', [
        'fetchCurrentUser'
      ]),
      fetchData() {
        this.fetchCurrentUser()
      }
    }
  }
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
