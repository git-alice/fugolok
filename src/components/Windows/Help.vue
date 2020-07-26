<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    div Помощь
    img(src="https://alexbsoft.github.io/win95.css/assets/confused_travolta.gif")
</template>

<script>
import Window from "@/components/Window/Window";

export default {
  name: 'Help',
  props: ['initOptions'],
  components: {
    Window
  },
  mounted() {
    console.log("from Help")
    console.log(this)
  }
}
</script>