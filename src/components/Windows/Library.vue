<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    h1 Library
    hr
    slot
    ImageLibrary
</template>

<script>
import Window from "@/components/Window/Window";
import ImageLibrary from "@/components/ImageLibrary/ImageLibrary";

export default {
  name: 'Library',
  props: ['initOptions'],
  components: {
    Window, ImageLibrary
  },
}
</script>