<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    template(v-slot:content)
      h1 Library
      hr
      slot
      ImageLibrary
</template>

<script>
import Window from "@/components/Elements/Window/Window";
import ImageLibrary from "@/components/Elements/ImageLibrary/ImageLibrary";

export default {
  name: 'Library',
  props: ['initOptions'],
  components: {
    Window, ImageLibrary
  },
}
</script>