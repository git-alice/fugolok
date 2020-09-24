<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    h1 Help
    hr
    slot
    // img(src="https://alexbsoft.github.io/win95.css/assets/confused_travolta.gif")
</template>

<script>
import Window from "@/components/Elements/Window/Window";

export default {
  name: 'Help',
  props: ['initOptions'],
  deactivated() {
    console.log('deactivated 2');
  },
  components: {
    Window
  },
  mounted() {
    console.log("from Help")
    console.log(this)
  }
}
</script>