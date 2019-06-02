<template>
    <div class="poll-list-item">
        <div class="poll-list-item-title">{{ title }}</div>
        <div class="buttons-container poll-list-item-buttons-container">
            <button class="button button--secondary button--small button--without-shadow" @click="$emit('delete-item')">Удалить</button>
            <button class="button button--secondary button--small button--without-shadow" @click="$emit('edit-item')">Редактировать</button>
            <button class="button button--primary button--small button--without-shadow" @click="$emit('run-item')">Запустить</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PollListItem",
        props: {
          title: String
        },
    }
</script>

<style lang="scss" scoped>
    .poll-list-item {
        background: #fff;
        border-radius: 5px;
        min-height: 70px;
        width: 100%;
        box-sizing: border-box;
        padding: 0 30px;

        font-family: 'Lato', Roboto, Arial, sans-serif;
        font-size: 18px;
        font-weight: 600;
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
    }
</style>
