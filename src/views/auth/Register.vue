<template lang="pug">
  RegisterWindow(:initOptions="initOptions" :windowName="this.$options.name")
</template>

<script>
import RegisterWindow from "@/components/Auth/RegisterWindow";

export default {
  name: 'Login',
  components: { RegisterWindow },
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
