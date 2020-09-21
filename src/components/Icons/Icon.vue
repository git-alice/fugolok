<template lang="pug">
  div(
    class="icon",
    @click="openWindow"
    )
    img(:src="hrefIcon")
    div {{ windowName }}
</template>

<script>
export default {
  name: "Icon",
  data() {
    return {}
  },
  props: ['hrefIcon', 'windowName'],
  methods: {
    openWindow() {
      this.$store.dispatch('appendWindow', {windowName: this.windowName, vm: this})
    }
  }
}
</script>

<style lang="scss">

.icon {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  flex-basis: auto;
  padding-bottom: 1rem;

  img {
    width: 60px;
    padding: 10px;
  }
}

</style>