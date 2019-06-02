<template>
    <div class="main" v-if="!loading">

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
            <div class="webinar-panel"  v-if="userIsAdmin">
                <h2 class="content-header-title">Список опросов</h2>
                <poll-list-item class="poll-list-item"
                                v-for="(poll, index) in polls"
                                v-on:edit-item="goToEditPollPage(poll)"
                                v-on:delete-item="deletePoll(poll)"
                                v-on:start-item="startPoll(poll)"
                                :key="index"
                                :state="poll.state"
                                :title="poll.question"/>
            </div>
            <div class="webinar-poll" v-if="!userIsAdmin">
                <template v-if="currentPoll">
                    <div class="webinar-poll-question">{{ currentPoll.question }}</div>
                    <div class="webinar-poll-answers">
                        <div v-for="(answer, index) in currentPoll.answers" :key="index"
                             @click="answer.checked = !answer.checked"
                             :class="{ 'webinar-poll-answer--checked': answer.checked }"
                             class="webinar-poll-answer">
                            {{ answer.value }}
                        </div>
                    </div>
                    <div class="buttons-container">
                        <button class="button button--primary" @click="saveAnswer"  v-show="answerButtonShow">Ответить</button>
                    </div>
                </template>
                <div class="webinar-poll-result" v-if="lastPollResult !== null">
                    {{ lastPollResult ? 'Правильный ответ!' : 'К сожалению, неверно:(' }}
                </div>
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
              socket : io('localhost:3000'),
              currentPoll: null,
              loading: true,
              lastPollResult: null
          }
        },
        mounted() {
            this.socket.on('poll_started', (data) => {
                console.log('poll_started')
                const poll = data.poll
                poll.answers.forEach(item => item.checked = false)
                this.currentPoll = poll
                // you can also do this.messages.push(data)
            });
            this.socket.on('poll_finished', (data) => {
                console.log('poll_finished')
                this.currentPoll = null
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
                    'deletePoll',
                    'switchPollState',
                    'sendAnswers'
            ]),
            fetchData() {
                this.fetchWebinar(this.webinarId)
                        .then(() => this.loading = false)
                // TODO: Только для админов
                this.fetchPolls(this.webinarId)
            },
            deleteWebinarAndGoToMain(webinar) {
                this.deleteWebinar(webinar)
                        .then(() => this.$router.replace({ name: 'Main' }))
            },
            startPoll(poll) {
                console.log('start poll socket')
                this.switchPollState({ poll, socket: this.socket })
                this.fetchPolls(this.webinarId)
            },
            saveAnswer() {
                this.sendAnswers({ selectedAnswers: this.selectedAnswers, poll: this.currentPoll })
                        .then(result => {
                            this.currentPoll = null
                            this.lastPollResult = result
                            console.log('RESULTTTT' + result)
                            setTimeout(() => this.lastPollResult = null, 5000)
                        })
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
            },
            selectedAnswers() {
                if (!this.currentPoll.answers) {
                    return []
                }
                return this.currentPoll.answers.filter(item => item.checked).map(item => item._id)
            },
            answerButtonShow() {
                return this.selectedAnswers.length > 0
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

    .webinar-poll {
        padding: 40px;
        width: 100%;
        min-height: 400px;
        border-radius: 10px;
        background: linear-gradient(125.8deg, rgba(255, 108, 171, 0.85) 0%,
                rgba(246, 96, 188, 0.85) 10.08%,
                rgba(236, 83, 205, 0.85) 20.17%,
                rgba(224, 69, 222, 0.85) 30.25%,
                rgba(211, 53, 238, 0.85) 40.34%, rgba(195, 35, 255, 0.85) 50.42%,
                rgba(181, 58, 255, 0.85) 60.34%, rgba(167, 73, 255, 0.85) 70.25%,
                rgba(152, 84, 255, 0.85) 80.17%, rgba(134, 94, 255, 0.85) 90.08%, rgba(164, 156, 255, 0.85) 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .webinar-poll-question {
        font-family: 'Raleway', Roboto, Arial, sans-serif;
        font-size: 28px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 25px;
    }

    .webinar-poll-answers {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .webinar-poll-answer {
        font-family: 'Raleway', Roboto, Arial, sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: #3c3c3c;
        background-color: rgba(255, 255, 255, 0.5);
        width: 100%;
        margin-bottom: 10px;

        display: block;

        border: none;
        text-decoration: none;
        padding: 1em 1.7em 0.9em 1.7em;
        border-radius: 2.4em;
        box-sizing: border-box;
        transition: all .15s ease;
        cursor: pointer;
        text-align: left;

        &:hover:not(.webinar-poll-answer--checked) {
            background-color: rgba(255, 255, 255, 0.7);
        }

        &--checked {
            background-color: rgba(255, 255, 255, 0.9);
        }
    }

    .webinar-poll-result {
        font-family: 'Raleway', Roboto, Arial, sans-serif;
        font-size: 30px;
        font-weight: 700;
        color: #fff;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>