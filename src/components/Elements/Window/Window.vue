<template lang="pug">
  WindowRaw(
    :init-width="initOptions.initWidth",
    :init-height="initOptions.initHeight",
    :init-x="initOptions.initX",
    :init-y="initOptions.initY",
    :init-Z="initOptions.initZ",
    :icon-src="initOptions.src",
    :windowType="windowType",
    :window-name="windowName",
    :content="content",
    @onDragStop="onDragWindowStop",
    @onResizingStop="onWindowResizingStop",
    @closeWindow="onCloseWindow",
    @rollWindow="onRollWindow",
    @maximizeWindow="onMaximizeWindow",
    @splitWindow="onSplitWindow",
    @onActivated="onActivated"
  )
    template(v-slot:content)
      slot(name="content")
    template(v-slot:status)
      slot(name="status")
</template>

<script>
import WindowRaw from '@/components/Elements/Window/WindowRaw'

export default {
    name: 'Window',
    data() {return {}},
    props: ['initOptions', 'windowName', 'windowType', 'content'],
    created() {
      console.log('from Window')
      console.log(this.initOptions)
      console.log(this.windowName)
    },
    methods: {
      onWindowResizingStop(w, h) {
        console.log('onWindowResizingStop', w, h)
        this.$store.dispatch('updateWindow', {windowName: this.windowName, w: w, h: h, vm: this});
      },
      onDragWindowStop(x, y) {
        this.$store.dispatch('updateWindow', {windowName: this.windowName, x: x, y: y, vm: this})
      },
      onCloseWindow() {
        // this.$store.dispatch('setDefaultConfig', this)
        console.log('onCloseWindow')
        this.$store.dispatch('deleteWindow', {windowName: this.windowName, vm: this})
      },
      onRollWindow() {
        this.$store.dispatch('updateWindow', {windowName: this.windowName, isOpen: false, vm: this})
      },
      onMaximizeWindow(x, y, w, h) {
        let options = {windowName: this.windowName, w: w, h: h, x: x, y: y, vm: this};
        this.$store.dispatch('updateWindow', options)
      },
      onSplitWindow(x, y, w, h) {
        let options = {windowName: this.windowName, w: w, h: h, x: x, y: y, vm: this};
        this.$store.dispatch('updateWindow', options)
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