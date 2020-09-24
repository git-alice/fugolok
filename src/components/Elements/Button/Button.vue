<template lang="pug">
  button(@click="test") button_toggle
</template>

<script>
export default {
  'name': 'Button',
  methods: {
    test() {
      this.$emit('testToggle', 'From testToggle')
    }
  }
}
</script>