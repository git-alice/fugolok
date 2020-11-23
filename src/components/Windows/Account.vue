<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    template(v-slot:content)
      img(src="https://www.w3schools.com/images/stickman.gif" width="24" height="39" alt="Stickman")
      p User profile: {{ user.email }}
      p photoURL:
        a(:href="photoURL") photo
      button(@click="logout()") Logout
      slot
</template>

<script>
import Window from "@/components/Elements/Window/Window";
import Button from "@/components/Elements/Button/Button";


export default {
  name: 'Account',
  data() {
    return {}
  },
  props: ['initOptions'],
  components: { Button, Window },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    photoURL() {
      return this.$store.getters.getPhotoURL
    }
  },
  methods: {
    // logout: function () {
    //   this.$store.dispatch('logout')
    //       .then(() => {
    //         this.$router.push('/login')
    //       })
    // },
  },
  mounted() {
    let user = this.$store.getters.user;

    this.$store.dispatch('getAllPhotos', user)
  }
}
</script>

<style lang="scss">

</style>