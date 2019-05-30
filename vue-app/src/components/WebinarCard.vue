<template>
  <div class="webinar-card">
    <div class="webinar-card-image" :style="cardImageStyle"></div>
    <div class="webinar-card-header">
      <div class="header-name-title">{{ name }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WebinarCard",
    props: {
      name: String,
      author: String,
      image: String
    },
    computed: {
      cardImageStyle() {
        return {
          'background-image': `url(${this.image})`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $webinar-card-font-family: Lato, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
  Helvetica, Arial, sans-serif !default;
  $webinar-card-shadow: rgba(0, 0, 0, 0.15) 0px 2px 10px 0px !default;
  $webinar-card-hover-shadow: 0 10px 20px rgba(220, 220, 220, 0.5) !default;
  $webinar-card-transition: .3s ease !default;

  .webinar-card {
    font-family: $webinar-card-font-family;
    color: #000;

    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: $webinar-card-shadow;

    box-sizing: border-box;


    display: flex;
    flex-direction: column;
    justify-content: stretch;

    overflow: hidden;
    position: relative;
    text-rendering: optimizeLegibility;
    transition: all $webinar-card-transition;
    will-change: transform, box-shadow;
    -webkit-font-smoothing: antialiased;
    cursor: pointer;

    &:hover {
      box-shadow: $webinar-card-hover-shadow;
      transform: translateY(-4px);
    }
  }

  .webinar-card-image {
    width: 100%;
    min-height: 200px;
    background-position: 50% 50%;
    background-position-x: 50%;
    background-position-y: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px 10px 0px 0px;
    box-sizing: border-box;
    transition: all $webinar-card-transition;
    will-change: transform;

    @at-root .webinar-card:hover & {
      transform: scale(1.02);
    }
  }

  .webinar-card-header {
    padding: 20px;
  }

  .header-name-title {
    font-size: 22px;
    font-weight: 600;
    color: inherit;
  }
</style>
