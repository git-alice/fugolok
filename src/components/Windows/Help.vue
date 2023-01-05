<template lang="pug">
  Window(:window-name="this.$options.name" :init-options="initOptions")
    template(v-slot:content)
      div.d-flex
        h2 Welcome to our darkroom
        span.d-table.m-auto.w-auto(v-tooltip.auto="{content: 'Click to find out how everything works here!', classes: 'simple__tooltip', trigger: 'hover', boundariesElement: 'body'}")
          img.tour__img(
            :src="require(\"@/assets/img/computer.png\")"
            @click="startTour"
          )
      div
        button(@click="getUserProfile") getProfile
      div {{ prettify(token) }}
      hr
      div {{ prettify(profile) }}
      // | Use <kbd>Ctrl</kbd> + [<kbd>Left</kbd>, <kbd>Right</kbd>, <kbd>Up</kbd>, <kbd>Down</kbd>] for split, fullscreen and minimize active window.
      // hr
      // br
      // ul For MVP product:
      //   li
      //     ul [Backend]
      //       li Fix upload a film [Itemize load, Create&save cover, Database model]
      //       li Add getting a film
      //         ul
      //           li Getting films list
      //           li Getting a single film with photos
      //   li
      //     ul [Frontend]
      //       li Fix upload a film by a single photo
      //       li Add show films and film
      //       li Close all window -> Current time
      //       li


</template>

<script>
import Window from "@/components/Elements/Window/Window";
import Button from "@/components/Elements/Button/Button";
import Test from "@/components/Elements/ImageLibrary/ImageLibrary";

export default {
  name: 'Help',
  data() {
    return {
        profile: {a: 1},
        token: ''
    }
  },
  props: ['initOptions'],
  deactivated() {
    console.log('deactivated 2');
  },
  components: {
    Test,
    Button,
    Window
  },
  methods: {
    startTour() {
      this.$tours['myTour'].start()
    },
    getUserProfile() {
      console.log(this.$store.getters)
      this.profile = this.$store.getters.getUserProfile
      this.token = this.$store.getters.getUserToken
    },
    prettify(v) {
      return JSON.stringify(v, null, 2)
    }
  },
  mounted() {
    console.log("from Help")
    console.log(this)
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style-type: revert;
  padding-inline-start: 10px;
}

li {
  padding-top: 3px;
}

@keyframes book_levitation {
  from {
    margin-bottom: 0;
  }
  50% {
    margin-bottom: 10px;
  }
  to {
    margin-bottom: 0;
  }
}

.tour__img {
  animation-name: book_levitation;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;

  &:hover {
    cursor: pointer;
  }
}

</style>