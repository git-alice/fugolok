<template lang="pug">
  Window(:initOptions="initOptions" :window-name="this.$options.name")
      DropMeFileForm
</template>

<script>
import Window from '@/components/Window/Window'
import DropMeFileForm from '@/components/DropMeFile/Form'

export default {
  name: 'ExDropMe',
  props: ['initOptions'],
  mounted() {},
  methods: {},
  components: {
        Window, DropMeFileForm
    }
}
</script>