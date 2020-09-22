<template lang="pug">
  button.task__button(@contextmenu.prevent="")
    img(src="@/assets/img/start.png")
    b Окно {{ id }}
</template>

<script>
  export default {
    name: 'TaskButton',
    methods: {}
  }
</script>

<style>
.task__button {
    margin: 1px;
    top: 1px;
    bottom: 1px;
    font-weight: 500;
    font-size: 14px;
}
</style>