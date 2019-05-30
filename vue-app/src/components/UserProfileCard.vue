<template>
  <div class="user-profile-card" @click="goToProfile">
    <div class="user-profile-card__header">
      <div class="header__name">{{ userName }}</div>
      <div class="header__avatar"><img :src="userImage" alt=""></div>
    </div>
    <div class="user-profile-card__content">
      Открыть профиль
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserProfileCard",
      props: {
          userName: String,
          userImage: String,
          path: Object
      },
      methods: {
          goToProfile() {
              this.$router.push(this.path)
          }
      }
  }
</script>

<style lang="scss" scoped>
  $user-profile-card-font-family: 'Lato', Roboto, Arial, sans-serif !default;
  $user-profile-card-name-font-weight: 600 !default;
  $user-profile-card-menu-font-weight: 500 !default;

  .user-profile-card {
    box-sizing: border-box;
    padding: 20px;
    font-family: $user-profile-card-font-family;
  }

  .user-profile-card__header {
    display: flex;
    justify-content: flex-end;
    border-bottom: #F3F4F6 1px solid;
    align-items: center;
    padding-bottom: 15px;
  }

  .header__avatar {
    overflow: hidden;
    width: 56px;
    height: 56px;
    border-radius: 32px;

    img {
      width: 100%;
    }
  }

  .header__name {
    margin-right: 10px;
    font-size: 22px;
    font-weight: $user-profile-card-name-font-weight;
    color: #333;
  }

  .user-profile-card__content {
    padding-top: 15px;
    text-align: center;
    font-size: 14px;
    font-weight: $user-profile-card-menu-font-weight;
    color: #333;
    opacity: 0.5;
  }
</style>
