<template>
    <transition name="slide">
      <aside class="navigation-drawer" v-if="show">
        <div class="navigation-drawer-content">
          <div class="navigation-drawer-profile" @click="goToProfile">
            <img :src="userImage" :alt="userName" class="profile-img">
            <div class="profile-name">{{ userName }}</div>
          </div>
          <div v-for="(items, index) in [primaryMenuItems, secondaryMenuItems]" :key="index" class="navigation-drawer-menu">
            <template v-for="(item, itemIndex) in items">
              <a :href="item.externalPath" class="menu-item" v-if="item.externalLink === true" :key="index+'-'+itemIndex">
                <div class="menu-item-icon">
                  <svg-sprite v-if="item.iconActive" :icon="item.iconActive" :width="32" :height="32"/>
                </div>
                <span class="menu-item-value">{{ item.title }}</span>
              </a>
              <router-link v-else
                           :key="index+'-'+itemIndex"
                           class="menu-item"
                           :to="item.path"
                           :class="{ 'menu-item--hidden': item.hideIfCurrent }"
                           active-class="menu-item--selected"
                            @click.native="closeNavDrawer">
                <div class="menu-item-icon">
                  <svg-sprite v-if="item.iconActive" :icon="item.iconActive" :width="32" :height="32"/>
                </div>
                <span class="menu-item-value">{{ item.title }}</span>
              </router-link>
            </template>
            <div class="menu-divider" v-if="showDivider(index)"></div>
          </div>
        </div>
      </aside>
    </transition>
</template>

<script>
  import { switchBodyNoScroll } from 'Helpers/no-scroll.js'

  export default {
    name: 'NavigationDrawer',
    props: {
        selectItems: Array,
        currentSelectItemValue: String,
        onSelectItemHandler: Function,
        userImage: String,
        userName: String,
        primaryMenuItems: Array,
        secondaryMenuItems: Array,
        show: Boolean,
        profilePath: Object
    },
    methods: {
      showDivider (index) {
        return index === 0 && this.secondaryMenuItems && this.primaryMenuItems && this.primaryMenuItems.size !== 0
      },
      closeNavDrawer () {
        this.$emit('closeNavDrawer')
      },
      goToProfile() {
        this.$router.push(this.profilePath)
        this.closeNavDrawer()
      }
    },
    watch: {
      show(value) {
        switchBodyNoScroll(value, 'noscroll')
      }
    }
  }
</script>

<style lang="scss">
  $navigation-drawer-background: #fff !default;
  $navigation-drawer-padding: 40px !default;
  $navigation-drawer-font-family: Lato, Roboto, Arial, sans-serif !default;
  $navigation-drawer-color: #333 !default;
  $navigation-drawer-color-hover: #333 !default;
  $navigation-drawer-color-active: #fff !default;
  $navigation-drawer-background-hover: #F0EDF6 !default;
  $navigation-drawer-background-active: #6F64E9 !default;
  $navigation-drawer-menu-divider-color: #D5DBDF !default;

  .navigation-drawer {
    background: $navigation-drawer-background;
    font-family: $navigation-drawer-font-family;
    color: $navigation-drawer-color;
    position: fixed;
    top: 56px;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1000;
  }

  .navigation-drawer-content {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    @include noselect;
  }

  .navigation-drawer-menu {
    display: flex;
    flex-direction: column;
  }

  .menu-item {
    width: 100%;
    font-size: 20px;
    text-decoration: none;
    line-height: 50px;
    display: flex;
    margin-bottom: 1px;
    color: #463853;
    align-items: center;
    min-height: 56px;
    max-height: 56px;

    &:hover:not(.menu-item--selected), &:active:not(.menu-item--selected) {
      background: $navigation-drawer-background-hover;
      transition: background-color 0.3s ease;
    }

    &--hidden.menu-item--selected {
      display: none;
    }
  }

  .menu-item-icon {
    min-width: 32px;
    max-width: 32px;
    min-height: 32px;
    max-height: 32px;
    margin-left: $navigation-drawer-padding;
    margin-right: 30px;
  }

  .menu-item-value {
    font-size: 16px;
    font-weight: 600;
    width: 100%;
  }

  .menu-item--selected {
    background: $navigation-drawer-background-active;
    color: #fff;
  }

  .navigation-drawer-profile {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    min-height: 80px;
    max-height: 80px;
    @include noselect;
    margin-bottom: 0;
    cursor: pointer;
  }

  .profile-name {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }

  .profile-img {
    width: 40px;
    min-height: 40px;
    max-height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: $navigation-drawer-padding;
    margin-right: 15px;
  }

  .menu-divider {
    background: $navigation-drawer-menu-divider-color;
    width: 85%;
    height: 1px;
    align-self: center;
    margin: 5px 0;
  }

  /* Transitions */
  .slide-enter-active, .slide-leave-active {
    transition: all .4s ease;
  }

  .slide-enter, .slide-leave-to {
    top: -100%;
    max-height: 100vh;
    opacity: 0.5;
  }
</style>
