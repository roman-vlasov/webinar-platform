<template>
  <div class="webinar-edit-page form">
    <h2 class="content-header-title">{{ pageTitle }}</h2>
    <table class="table-form">
      <tr>
        <td><span class="text-input-label">Название</span></td>
        <td><input type="text" class="text-input" v-model.trim="webinar.title"></td>
      </tr>
      <tr>
        <td><span class="text-input-label">URL изображения</span></td>
        <td><input type="text" class="text-input" v-model.trim="webinar.image"></td>
      </tr>
      <tr>
        <td><span class="text-input-label">id трансляции</span></td>
        <td><input type="text" class="text-input" v-model.trim="webinar.url"></td>
      </tr>
      <tr>
        <td><span class="text-input-label">Описание</span></td>
        <td><textarea name="" id="" cols="30" rows="10" class="text-input" v-model.trim="webinar.description"></textarea></td>
      </tr>
    </table>
    <div class="buttons-container">
      <button class="webinar-edit-button button button--secondary">Отмена</button>
      <button class="webinar-edit-button button button--primary" @click="saveWebinar">Сохранить</button>
    </div>
  </div>
</template>

<script>
  import axios from "../axios-instance"

  export default {
    name: "WebinarEditPage",
    data() {
      return {
        webinar: {
          title: '',
          description: '',
          image: '',
          url: ''
        },
      }
    },
    props: {
      editMode: Boolean
    },
    created () {
      if (this.editMode) {
        this.fetchData()
      }
    },
    methods: {
      fetchData() {
        axios.get(`/api/webinars/${this.webinarId}`)
            .then(response => {
              console.log(response.data)
              this.webinar = response.data
              return response
            })
      },
      saveWebinar() {
        axios.put(`/api/webinars/${this.webinarId}`, this.webinar)
            .then(response => {
              this.$router.push({ name: 'Main' })
              return response
            })
      }
    },
    computed: {
      webinarId() {
        return this.$route.params.webinarId
      },
      pageTitle() {
        return this.editMode ? 'Редактирование вебинара' : 'Создание вебинара'
      }
    }
  }
</script>

<style lang="scss" scoped>
  $page-content-padding: 30px 30px !default;
  $page-content-desktop-breakpoint: 950px !default;
  $page-content-width-stretch-breakpoint: 760px !default;
  $page-content-mobile-padding: 20px 20px !default;

  //$course-plan-modal-medium-breakpoint: 1200px !default;

  .webinar-edit-page {
    padding: $page-content-padding;

    @media screen and (max-width: $page-content-desktop-breakpoint - 1) {
      padding: $page-content-mobile-padding;
    }
  }
</style>