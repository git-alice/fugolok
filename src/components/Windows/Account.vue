<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    h1 Name: Alexey
    img(src="https://www.w3schools.com/images/stickman.gif" width="24" height="39" alt="Stickman")
    button(@click="logout()") Logout

    slot
</template>

<script>
import Window from "@/components/Elements/Window/Window";
import Button from "@/components/Elements/Button/Button";

export default {
  name: 'Account',
  props: ['initOptions'],
  components: { Button, Window },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
    },
  }
}
</script>