<template lang="pug">
  span
    LoginWindow(:initOptions="initOptions" :windowName="this.$options.name")
</template>

<script>
import LoginWindow from "@/components/Auth/LoginWindow";

export default {
  name: 'Login',
  components: { LoginWindow },
  data() {
    return {
      initOptions: {
        initWidth: 600,
        initHeight: 220,
        initX: window.innerWidth / 2 - 600 / 2,
        initY: window.innerHeight / 2 - 220 / 2,
      }
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style>
</style>
