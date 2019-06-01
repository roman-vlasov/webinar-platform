<template>
    <div class="main">

        <div class="buttons-container">
            <button class="button button--secondary" @click="goToEditWebinarPage(webinar)">Управление вебинаром</button>
        </div>
        <div class="webinar-column">
            <div class="webinar-iframe">
                <iframe width="560"
                        height="315"
                        :src="iframeSrc"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
            </div>
            <div class="webinar-info">
                <h2 class="content-header-title">{{ webinar.title }}</h2>
                <p class="webinar-description">{{ webinar.description }}</p>
            </div>

        </div>


    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'

    import io from 'socket.io-client';

    export default {
        name: "WebinarPage",
        created() {
            this.fetchData()
        },
        data() {
          return {
              socket : io('localhost:3000/')
          }
        },
        mounted() {
            this.socket.on('news', (data) => {
                console.log(data)
                // you can also do this.messages.push(data)
            });
        },
        methods: {
            ...mapActions('Webinars', [
                'fetchWebinar',
                'goToEditWebinarPage'
            ]),
            ...mapActions('Polls', [
                'fetchWebinars'
            ]),
            fetchData() {
                this.fetchWebinar(this.webinarId)
                if (this.userIsAdmin) {
                    this.fetchPolls(this.webinarId)
                }
            }
        },
        computed: {
            ...mapGetters('Webinars', [
                'webinar'
            ]),
            ...mapGetters('Polls', [
                'polls'
            ]),
            ...mapGetters('UserProfile', [
                'userIsAdmin'
            ]),
            webinarId() {
                return this.$route.params.webinarId
            },
            iframeSrc() {
                return `https://www.youtube.com/embed/${this.webinar.url}?controls=0`
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