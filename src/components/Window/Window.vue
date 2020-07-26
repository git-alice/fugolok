<template lang="pug">
  div
    WindowRaw(
      :init-width="initOptions.initWidth",
      :init-height="initOptions.initHeight",
      :init-x="initOptions.initX",
      :init-y="initOptions.initY"
      @onDragStop="onDragWindowStop",
      @onResizingStop="onWindowResizingStop"
    )
      slot
</template>

<script>
import WindowRaw from '@/components/Window/WindowRaw'

export default {
    name: 'Window',
    data() {return {}},
    props: ['initOptions', 'windowName'],
    created() {
      console.log('from Window')
      console.log(this)
      console.log(this.initOptions)
      console.log(this.windowName)
    },
    methods: {
      onWindowResizingStop(w, h) {
        this.$store.dispatch('setCookies', {windowName: this.windowName, w: w, h: h, vm: this});
      },
      onDragWindowStop(x, y) {
        this.$store.dispatch('setCookies', {windowName: this.windowName, x: x, y: y, vm: this});
      }
    },
    components: {
      WindowRaw
    }
}
</script>

<style scoped>

</style>