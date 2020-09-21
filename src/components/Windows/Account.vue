<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    h1 Name: Alexey
    img(src="https://www.w3schools.com/images/stickman.gif" width="24" height="39" alt="Stickman")
    hr
    p About: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, aut cumque dolorem dolorum ducimus eveniet itaque maxime molestias necessitatibus obcaecati odit perferendis perspiciatis quia quibusdam rem sed sequi voluptate voluptatem?
    p Plan: 2/3

    slot
</template>

<script>
import Window from "@/components/Window/Window";

export default {
  name: 'Account',
  props: ['initOptions'],
  components: { Window },
}
</script>