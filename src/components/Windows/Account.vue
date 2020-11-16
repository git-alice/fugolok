<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    template(v-slot:content)
      img(src="https://www.w3schools.com/images/stickman.gif" width="24" height="39" alt="Stickman")
      p Full name: {{ user.name }}
      p Email: {{ user.email }}
      p Email: {{ user }}
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