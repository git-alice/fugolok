<template lang="pug">
    button.task_button Окно {{ id }}
</template>

<script>
    export default {
        props: [
            'id'
        ],

    }
</script>

<style>
    .task_button {
        top: 1px;
        bottom: 1px;
        font-weight: 500;
        font-size: 14px;
    }
</style>