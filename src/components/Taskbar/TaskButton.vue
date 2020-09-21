<template lang="pug">
  button.task_button(@contextmenu.prevent="")
    img(src="@/assets/start.png")
    b Окно {{ id }}
</template>

<script>
  export default {
    name: 'TaskButton',
    methods: {}
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