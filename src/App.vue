<template lang="pug">
div(id="app", v-on:keyup.ctrl.right="testNoti")
  // router-link(to="/home") Home

  // --- Notfications ---
  notifications(group="info" classes="notification")

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

import Vue from './main'

export default {
  name: 'App',
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
          .then(function () {
            this.$router.push('/login')
          })
    },
    notifyStatus(title, text) {
      this.$notify({
        group: 'info',
        title: 'Ваш токен истек.',
        text: 'Попробуйте зайти снова!',
      });
    }
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  /**
   * Let's handle the case of rotten tokens
   */
  created() {
    // Add a response interceptor
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise((resolve, reject) => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout")
        }
        throw err;
      });
    });
  },
}
</script>
