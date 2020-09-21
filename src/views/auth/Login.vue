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
        initWidth: 400,
        initHeight: 300,
        initX: window.innerWidth / 2 - 400 / 2,
        initY: window.innerHeight / 2 - 300 / 2,
      }
    }
  },
  methods: {},
  mounted() {}
}
</script>

<style>
</style>
