<template lang="pug">
  Window(:initOptions="initOptions" :window-name="this.$options.name")
    TestUploadFile
</template>

<script>
import Window from '@/components/Elements/Window/Window'
import DropMeFileForm from '@/components/Elements/DropMeFile/Form'
import TestUploadFile from "@/components/Elements/DropMeFile/TestUploadFile";

export default {
  name: 'SimpleFilm',
  props: ['initOptions'],
  mounted() {},
  methods: {},
  components: {
        Window, TestUploadFile
    }
}
</script>