<template>
  <div class="main">
    <h2 class="content-header-title">Вебинары в прямом эфире</h2>

    <webinar-card v-for="(webinar, index) in webinars"
                  class="webinar-card"
                  :key="index"
                  :name="webinar.title"
                  :image="webinar.image"
                  @click.native="openWebinarPage(webinar)"/>
  </div>
</template>

<script>
  import axios from "../axios-instance"

  import WebinarCard from 'Components/WebinarCard.vue'

  export default {
    name: "Main",
    data() {
      return {
        webinars: []
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData() {
        axios.get('/api/webinars')
            .then(response => {
              console.log(response.data)
              this.webinars = response.data
              return response
            })
      },
      openWebinarPage(webinar) {
        console.log(webinar._id)
        this.$router.push({ name: 'WebinarPage', params: { webinarId: webinar._id }})
      }
    },
    components: {
      WebinarCard
    }
  }
</script>

<style lang="scss" scoped>
  $page-content-padding: 30px 30px !default;
  $page-content-desktop-breakpoint: 950px !default;
  $page-content-width-stretch-breakpoint: 760px !default;
  $page-content-mobile-padding: 20px 20px !default;

  //$course-plan-modal-medium-breakpoint: 1200px !default;

  .main {
    padding: $page-content-padding;

    @media screen and (max-width: $page-content-desktop-breakpoint - 1) {
      padding: $page-content-mobile-padding;
    }
  }

  .webinar-card {
    width: 340px;
    margin: 0 20px 25px 0;
    min-height: 200px;

    @media screen and (max-width: $page-content-width-stretch-breakpoint - 1) {
      width: 100%;
      margin: 0 0 15px 0;
    }
  }
</style>