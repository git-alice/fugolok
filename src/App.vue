<template lang="pug">
div(id="app", v-on:keyup.ctrl.right="testNoti")
  router-view

//    <ul>
//      <li><router-link to="/home">Home</router-link></li>
//      <li><router-link to="/window_1">Win 1</router-link></li>
//      <li><router-link to="/window_2">Win 2</router-link></li>
//      <li><router-link to="/library">Library</router-link></li>
//    </ul>
//    <router-view/>
</template>

<script>
export default {
  name: 'App',
  methods: {
    test() {
      console.log('Ctrl + Right')
    }
  }
}
</script>
