<template lang="pug">
  Window(:initOptions="initOptions" :window-name="this.$options.name")
      DropMeFileForm
</template>

<script>
import Window from '@/components/Elements/Window/Window'
import DropMeFileForm from '@/components/Elements/DropMeFile/Form'

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