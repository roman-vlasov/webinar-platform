<template>
    <div class="poll-edit-page form">
        <h2 class="content-header-title">{{ pageTitle }}</h2>
        <table class="table-form">
            <tr>
                <td><span class="text-input-label">Вопрос</span></td>
                <td><input type="text" class="text-input" v-model.trim="pollFields.question"></td>
            </tr>
            <tr>
                <td valign="top"><span class="text-input-label">Варианты ответа<br>(отметьте галочкой правильные)</span></td>
                <td>
                    <div class="poll-answer-container" v-for="(answer, index) in pollFields.answers">
                        <input type="checkbox" class="answer-checkbox" v-model="pollFields.answers[index].right">
                        <input type="text"
                               class="text-input poll-answer"
                               :key="index"
                               v-model.trim="pollFields.answers[index].value">
                        <button class="button button--secondary" @click="pollFields.answers.splice(index, 1)">Удалить</button>
                    </div>
                    <button class="button button--primary" @click="pollFields.answers.push({ value: '', right: false })">Добавить вариант</button>

                </td>
            </tr>
        </table>
        <div class="buttons-container poll-buttons-container">
            <button class="button button--secondary" @click="cancel">Отмена</button>
            <button class="button button--primary" @click="savePoll">Сохранить</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'


    export default {
        name: "PollEditPage",
        props: {
            editMode: Boolean
        },
        data() {
            return {
                pollFields: {
                    question: '',
                    answers: []
                }
            }
        },
        created() {
            if (this.editMode) {
                this.fetchData()
            }
        },
        methods: {
            ...mapActions('Polls', [
                'fetchPoll',
                'resetPoll'
            ]),
            fetchData() {
                if (this.editMode) {
                    this.fetchPoll({ webinarId: this.webinarId, pollId: this.pollId })
                        .then(response => {
                            this.pollFields.question = response.data.question
                            this.pollFields.answers = response.data.answers
                        })
                } else {
                    this.resetPoll()
                }
            },
            savePoll() {
                this.$store.dispatch('Polls/savePoll', {
                    webinarId: this.webinarId,
                    pollId: this.pollId,
                    poll: {
                        question: this.pollFields.question,
                        answers : this.pollFields.answers
                    }
                })
                    .then(() => {
                        this.$router.push({name: 'WebinarPage', params: {webinarId: this.webinarId}})
                    })
            },
            cancel() {
                this.$router.go(-1)
            }
        },
        computed: {
            webinarId() {
                return this.$route.params.webinarId
            },
            pollId() {
                if (!this.editMode) {
                    return null
                }
                return this.$route.params.pollId
            },
            pageTitle() {
                return this.editMode ? 'Редактирование опроса' : 'Создание опроса'
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

    .poll-edit-page {
        padding: $page-content-padding;

        @media screen and (max-width: $page-content-desktop-breakpoint - 1) {
            padding: $page-content-mobile-padding;
        }
    }

    .poll-buttons-container {
        justify-content: flex-end;
    }

    .poll-answer {
        display: block;
    }

    .poll-answer-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .answer-checkbox {
        margin: 15px;
        display: block;
    }
</style>