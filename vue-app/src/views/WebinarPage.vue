<template>
    <div class="main">

        <div class="buttons-container" v-if="userIsAdmin">
            <button class="button button--secondary" @click="deleteWebinarAndGoToMain(webinar)">Удалить вебинар</button>
            <button class="button button--secondary" @click="goToEditWebinarPage(webinar)">Редактировать вебинар</button>
            <button class="button button--secondary" @click="goToCreatePollPage(webinar)">Создать опрос</button>
        </div>
        <div class="webinar-row">
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
            <div class="webinar-panel">
                <h2 class="content-header-title">Список опросов</h2>
                <poll-list-item class="poll-list-item"
                                v-for="(poll, index) in polls"
                                v-on:edit-item="goToEditPollPage(poll)"
                                v-on:delete-item="deletePoll(poll)"
                                :key="index"
                                :title="poll.question"/>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'

    import PollListItem from 'Components/PollListItem.vue'

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
                'goToEditWebinarPage',
                    'deleteWebinar'
            ]),
            ...mapActions('Polls', [
                'fetchPolls',
                'goToEditPollPage',
                'goToCreatePollPage',
                    'deletePoll'
            ]),
            fetchData() {
                this.fetchWebinar(this.webinarId)
                // TODO: Только для админов
                this.fetchPolls(this.webinarId)
            },
            deleteWebinarAndGoToMain(webinar) {
                this.deleteWebinar(webinar)
                        .then(() => this.$router.replace({ name: 'Main' }))
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
                if (!this.webinar || !this.webinar.url) {
                    return 'https://www.youtube.com/embed/?controls=0'
                }
                return `https://www.youtube.com/embed/${this.webinar.url}?controls=0`
            }
        },
        components: {
            PollListItem
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

    .webinar-row {
        display: flex;
        flex-direction: row;
    }

    .webinar-column {
        margin-right: 50px;
    }

    .webinar-panel {
        width: 100%;
        max-width: 900px;
    }

    .poll-list-item {
        margin-bottom: 15px;
    }
</style>