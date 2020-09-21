<template lang="pug">
  Window(:initOptions="initOptions" :window-name="this.$options.name")
    button.btn.mr-2.mb-2.btn-primary(type='button', data-toggle='tooltip', data-placement='left', title='', data-original-title='The quick brown fox jumps over the lazy dog.')
      span.btn-text Left

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
