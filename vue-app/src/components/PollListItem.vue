<template>
    <div class="poll-list-item" @click.native="onButtonClick">
        <div class="poll-list-item-title">{{ title }}</div>
        <div class="buttons-container poll-list-item-buttons-container">
            <button class="button button--secondary" @click="cancel">Удалить</button>
            <button class="button button--primary" @click="saveWebinar">Запустить</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PollListItem",
        props: {
          title: String
        },
        methods: {
            onButtonClick() {
                this.$emit('start-tasks-collections')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tasks-collection-card {
        background: #fff;
        border-radius: 5px;
        min-height: 70px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 30px;

        font-family: 'Lato', Roboto, Arial, sans-serif;
        font-size: 18px;
        font-weight: 500;
        color: #333;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        @media screen and (min-width: 0px) and (max-width: $sm - 1) {
            padding-top: 15px;
            padding-bottom: 15px;
            flex-direction: column;
            align-items: flex-start;

            padding-left: 25px;
            padding-right: 25px;
        }

        cursor: pointer;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
        transition: all 0.3s ease;

        &:hover {
            box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.20);
            /*transform: scale(1.005, 1.005);*/
        }

        margin-top: 10px;
        margin-bottom: 10px;
    }

    .card-row {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .card-row-1 {
        @media screen and (min-width: 0px) and (max-width: $sm - 1) {
            margin-bottom: 10px;
        }
    }

    .card-row-2 {
        @media screen and (min-width: 0px) and (max-width: $sm - 1) {
            justify-content: space-between;
            width: 100%;
        }
    }

    .tasks-collection-card--success {
        border-left: 10px solid #BFF199;
        padding-left: 20px;

        @media screen and (min-width: 0px) and (max-width: $sm - 1) {
            padding-left: 15px;
        }
    }

    .tasks-collection-card--failed {
        border-left: 10px solid #FFD3D1;
        padding-left: 20px;

        @media screen and (min-width: 0px) and (max-width: $sm - 1) {
            padding-left: 15px;
        }
    }

    .tasks-collection-card__label {
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        color: inherit;
        padding-right: 30px;

        @media screen and (min-width: 0px) and (max-width: $sm - 1) {
            padding-right: 15px;
            font-weight: 600;
        }
    }

    .tasks-collection-card__title {
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        color: inherit;

        @media screen and (min-width: 0px) and (max-width: $sm - 1) {
            font-weight: 600;
        }
    }

    .tasks-collection-card__rating {
        text-align: center;
        margin-right: 30px;
    }

    .rating__title {
        font-family: inherit;
        font-size: 14px;
        font-weight: inherit;
        color: inherit;
    }

    .rating__stars {
        margin-left: auto;
        max-width: 65px;
        margin-right: auto;
    }

    .tasks-collection-card__button {
        width: 120px;
    }
</style>
