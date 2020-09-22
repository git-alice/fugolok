<template lang="pug">
  WindowRaw(
    :init-width="initOptions.initWidth",
    :init-height="initOptions.initHeight",
    :init-x="initOptions.initX",
    :init-y="initOptions.initY"
    :windowType="windowType",
    :content="content",
    @onDragStop="onDragWindowStop",
    @onResizingStop="onWindowResizingStop",
    @closeWindow="onCloseWindow",
    @rollWindow="onRollWindow",
    @maximizeWindow="onMaximizeWindow",
    @splitWindow="onSplitWindow",
    @onActivated="onActivated"
  )
    slot
</template>

<script>
import WindowRaw from '@/components/Window/WindowRaw'

export default {
    name: 'Window',
    data() {return {}},
    props: ['initOptions', 'windowName', 'windowType','content'],
    created() {
      console.log('from Window')
      console.log(this.initOptions)
      console.log(this.windowName)
    },
    methods: {
      onWindowResizingStop(w, h) {
        this.$store.dispatch('setCookies', {windowName: this.windowName, w: w, h: h, vm: this});
      },
      onDragWindowStop(x, y) {
        this.$store.dispatch('setCookies', {windowName: this.windowName, x: x, y: y, vm: this})
      },
      onCloseWindow() {
        // this.$store.dispatch('setDefaultConfig', this)
        console.log('onCloseWindow')
        this.$store.dispatch('deleteWindow', {windowName: this.windowName, vm: this})
      },
      onRollWindow() {
        this.$store.dispatch('setCookies', {windowName: this.windowName, isOpen: false, vm: this})
      },
      onMaximizeWindow(x, y, w, h) {
        console.log('ON MAXIMIZE WINDOW');
        // console.log(this.windowName);

        let options = {windowName: this.windowName, w: w, h: h, x: x, y: y, vm: this};
        // console.log(options)
        this.$store.dispatch('setCookies', options)
      },
      onSplitWindow(x, y, w, h) {
        let options = {windowName: this.windowName, w: w, h: h, x: x, y: y, vm: this};
        this.$store.dispatch('setCookies', options)
      },
      onActivated() {
        this.$store.dispatch('setActiveWindow', this.$parent.$options.name)
      }
    },
    components: {
      WindowRaw
    }
}
</script>