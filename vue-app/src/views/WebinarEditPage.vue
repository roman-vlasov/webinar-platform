<template>
    <div class="webinar-edit-page form">
        <h2 class="content-header-title">{{ pageTitle }}</h2>
        <table class="table-form">
            <tr>
                <td><span class="text-input-label">Название</span></td>
                <td><input type="text" class="text-input" v-model.trim="webinarFields.title"></td>
            </tr>
            <tr>
                <td><span class="text-input-label">URL изображения</span></td>
                <td><input type="text" class="text-input" v-model.trim="webinarFields.image"></td>
            </tr>
            <tr>
                <td><span class="text-input-label">id трансляции</span></td>
                <td><input type="text" class="text-input" v-model.trim="webinarFields.url"></td>
            </tr>
            <tr>
                <td><span class="text-input-label">Описание</span></td>
                <td><textarea name="" id="" cols="30" rows="10" class="text-input"
                              v-model.trim="webinarFields.description"></textarea></td>
            </tr>
        </table>
        <div class="buttons-container webinar-buttons-container">
            <button class="webinar-edit-button button button--secondary" @click="cancel">Отмена</button>
            <button class="webinar-edit-button button button--primary" @click="saveWebinar">Сохранить</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'


    export default {
        name: "WebinarEditPage",
        props: {
            editMode: Boolean
        },
        data() {
            return {
                webinarFields: {
                    title: '',
                    description: '',
                    image: '',
                    url: ''
                }
            }
        },
        created() {
            if (this.editMode) {
                this.fetchData()
            }
        },
        methods: {
            ...mapActions('Webinars', [
                'fetchWebinar',
                'resetWebinar',
            ]),
            fetchData() {
                if (this.editMode) {
                    console.log('fetch')
                    this.fetchWebinar(this.webinarId)
                        .then(response => this.webinarFields = response.data)
                } else {
                    this.resetWebinar()
                }
            },
            saveWebinar() {
                this.$store.dispatch('Webinars/saveWebinar', {webinarId: this.webinarId, webinar: this.webinarFields})
                    .then(() => {
                        if (this.editMode) {
                            this.$router.push({name: 'WebinarPage', params: {webinarId: this.webinarId}})
                        } else {
                            this.$router.push({name: 'Main'})
                        }
                    })
            },
            cancel() {
                this.$router.go(-1)
            }
        },
        computed: {
            webinarId() {
                if (!this.editMode) {
                    return null
                }
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

    .webinar-buttons-container {
        justify-content: flex-end;
    }
</style>