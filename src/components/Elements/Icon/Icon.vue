<template lang="pug">
  vue-draggable-resizable(
    :w="43",
    :h="43",
    :x="x",
    :y="y"
    :resizable="false",
    :grid=[20,20],
    @activated="onActivated",
    @deactivated="onDeactivated"
  )
    div(class="icon", @dblclick="openWindow")
      img(:src="src")
      div(v-bind:class="{'active': isActive}") {{ windowName }}
</template>

<script>
export default {
  name: "Icon",
  data() { return {
    isActive: false
  } },
  props: ['src', 'windowName', 'x', 'y', 'xWindow', 'yWindow', 'hWindow', 'wWindow'],
  methods: {
    onActivated() {
      this.isActive = true
    },
    onDeactivated() {
      this.isActive = false
    },
    openWindow() {
      // Add window to store
      this.$store.dispatch('appendWindow', {windowName: this.windowName, src: this.src, vm: this})
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
  .active {
    border: 1px dotted black;
  }
}

</style>