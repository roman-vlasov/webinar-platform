<template>
    <header>
        <div class="navbar">
            <div class="navbar-left-side">
                <div class="navbar-header">
                    <h1 class="navbar-title" @click="goToMainPage">
                            {{ title }}
                    </h1>
                </div>
            </div>

            <nav class="navbar-menu">
                <template v-for="(item, index) in menuItems">
                    <a :href="item.externalPath" class="navbar-menu-item" v-if="item.externalLink === true"
                       :key="index">
                        {{ item.title }}
                    </a>
                    <router-link
                            v-else
                            :key="index"
                            :to="item.path"
                            class="navbar-menu-item"
                            :class="{ 'navbar-menu-item--hidden': item.hideIfCurrent }"
                            active-class="navbar-menu-item--selected">{{ item.title }}
                    </router-link>

                </template>
            </nav>

            <div class="navbar-right-side">
                <user-profile-card
                        :profile-url="profileUrl"
                        class="user-profile-card"
                        :user-name="userName"
                        :user-image="userImage"/>
                <img :src="userImage" :alt="userName" class="user-image">
            </div>
        </div>

        <div class="navbar-mobile">
            <div class="navbar-mobile-header">
                <img :src="appIcon" :alt="title" class="navbar-mobile-app-icon">
                <h1 class="navbar-mobile-title">{{ title }}</h1>
            </div>

            <div class="hamburger hamburger--slider"
                 :class="{ 'is-active': navDrawerActive }"
                 @click="$emit('hamburgerClick')">
                <div class="hamburger-box">
                    <div class="hamburger-inner"></div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import UserProfileCard from 'Components/UserProfileCard.vue'

    export default {
        name: 'AppNavBar',
        props: {
            title: String,
            userImage: String,
            userName: String,
            menuItems: Array,
            navDrawerActive: Boolean,
            appIcon: String,
            profilePath: Object,
            profileUrl: String,
            mainPageRouteName: String
        },
        methods: {
          goToMainPage() {
              if (this.mainPageRouteName) {
                  this.$router.replace({ name: 'Main'})
              }
          }
        },
        components: {
            UserProfileCard
        }
    }
</script>

<style lang="scss" scoped>
    $app-nav-bar-height: 100px !default;
    $app-navigation-desktop-breakpoint: 950px !default;
    $app-infinity-width: 100000px !default;
    $app-mobile-nav-bar-height: 60px !default;
    $app-nav-bar-title-font-family: 'Raleway', 'Lato', Roboto, Arial, sans-serif !default;
    $app-nav-bar-font-family: 'Lato', Roboto, Arial, sans-serif !default;
    $app-nav-bar-title-font-weight: 900 !default;
    $app-nav-bar-font-weight: 600 !default;
    $app-nav-bar-shadows: 0 2px 5px 0 rgba(0, 0, 0, 0.05) !default;
    $app-nav-bar-border-bottom: rgba(142, 81, 199, 0.05) 1px solid !default;
    $app-nav-bar-padding: 30px !default;
    $app-nav-bar-mobile-padding: 20px !default;

    .navbar {
        background-color: #fff;
        box-sizing: border-box;
        display: flex;
        font-family: $app-nav-bar-font-family;
        height: $app-nav-bar-height;

        padding-left: $app-nav-bar-padding;
        padding-right: $app-nav-bar-padding;
        align-items: center;
        justify-content: space-between;
        border-bottom: $app-nav-bar-border-bottom;

        @include show-for-screen-width($app-navigation-desktop-breakpoint, $app-infinity-width, flex);
    }

    .navbar-header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: baseline;
        margin-right: 30px;
        min-width: 410px;
    }

    .navbar-title {
        font-family: $app-nav-bar-title-font-family;
        font-size: 28px;
        font-weight: $app-nav-bar-title-font-weight;
        color: #333333;
        cursor: pointer;
        @include noselect;
    }

    .navbar-right-side {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        &:hover .user-profile-card {
            display: block;
        }
    }

    .user-image {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 15px;
    }

    .user-profile-card {
        position: absolute;
        right: -20px;
        top: -20px;
        background: #fff;
        border-radius: 10px;
        box-shadow: $app-nav-bar-shadows;
        display: none;
        cursor: pointer;

        &:hover {
            display: block;
        }
    }

    .navbar-menu {
        display: flex;

        &-item {
            position: relative;
            padding: 0.875rem 1rem;
            margin-left: 0.1rem;
            margin-right: 0.1rem;
            border-radius: 10px;
            font-size: 1.125rem;
            line-height: 1;
            font-weight: $app-nav-bar-font-weight;
            transition-duration: 86ms;
            cursor: pointer;
            color: #998DA0;
            text-decoration: none;

            &--hidden.navbar-menu-item--selected {
                display: none;
            }

            &:hover, &--selected {
                background: rgb(251, 251, 253);
                color: #463853;
            }
        }
    }

    .navbar-mobile {
        display: flex;
        height: $app-mobile-nav-bar-height;
        background: #FFF;
        align-items: center;
        justify-content: space-between;
        border-bottom: $app-nav-bar-border-bottom;
        box-sizing: border-box;
        padding-left: $app-nav-bar-mobile-padding;
        padding-right: $app-nav-bar-mobile-padding;

        z-index: 5000;

        @include show-for-screen-width(0, $app-navigation-desktop-breakpoint - 1, flex);

        &-header {
            display: flex;
        }

        &-app-icon {
            height: $app-mobile-nav-bar-height / 2;
        }

        &-title {
            font-family: $app-nav-bar-title-font-family;
            font-size: 24px;
            line-height: 32px;
            font-weight: $app-nav-bar-title-font-weight;
            color: #333333;
            margin-left: 10px;
            margin-top: 0;
            margin-bottom: 0;
            @include noselect;
        }
    }
</style>
