<template lang="pug">
   Window(:initOptions="initOptions" :window-name="this.$options.name")
    p initOptions
</template>

<script>
import Window from "@/components/Window/Window";

export default {
  name: 'LoginWindow',
  props: ['initOptions', 'windowName',],
  methods: {},
  components: { Window },
  mounted() {
    console.log('initOptions', this.initOptions)
    console.log('windowName', this.windowName)
    console.log('test', this.test)
    console.log('windowName', this)
  }
}
</script>

<style>
</style>
