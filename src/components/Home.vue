<template lang="pug">
    div(
      style="width: 100%; height: 100%"
      ref="layout")
      div(v-for="icon in icons")
        Icon(:href-icon="icon.src", :title-icon="icon.title")

      div(v-for="(value, name) in allWindows()")
        component(:is="name" :initOptions="value")

      // div(v-for="(value, name) in allWindows()")
      //  div {{ name }} {{ value }}

      Taskbar

      // button(@click="test") Hide window
      // button(@click="test2") Attach window

      //exWindow(
      //    :isOpen="isOpen"
      //    v-if="isOpen"
      //    @click="isOpen = !isOpen"
      //    @closeWindow="isOpen = false"
      //)
</template>

<script>
    import Vue from 'vue'
    import Help from "@/components/Windows/Help";
    import Taskbar from './Taskbar/Taskbar'
    import ExDropMe from './Windows/ExDropMe'
    import Window from "@/components/Window/Window";
    import Button from "./Buttons/Button";
    import Icon from "./Icons/Icon"

    export default {
      name: 'Home',
      data() {
        return {
          isOpen: true,
          openedWindows: [],
          windows: [],
          icons: [
            {'title': 'Computer', 'src': require("@/assets/desktop_icons/computer.png")},
            {'title': 'Folder', 'src': require("@/assets/desktop_icons/folder.png")},
            {'title': 'Net', 'src': require("@/assets/desktop_icons/net.png")}
          ]
        }
      },
      components: {
        Button, Icon, ExDropMe, Help, Taskbar, Window
      },
      methods: {
        showWindow() {
          this.isOpen = true
        },
        allWindows() {
          console.log('from allWindows')
          console.log(this.$cookies.get('userConfig'))
          return this.$store.getters.allWindows;
        }
      },
      mounted() {
        this.$store.dispatch('loadCookieWindows', this);
      }
    }
</script>

<style>
    #app {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }
    body{
        /*overflow: hidden;*/
    }

    @font-face {
        font-family: "PixelFont";
        src: url("../fonts/MS Sans Serif.ttf");
    }

    ul {
        list-style-type: none;
    }

  /*.handle {*/
  /*  position: absolute;*/
  /*  height: 15px !important;*/
  /*  width: 15px !important;*/
  /*  border: none;*/
  /*  box-model: border-box;*/
  /*}*/

  .handle-tl, .handle-tm, .handle-tr, .handle-mr, .handle-bl, .handle-ml, .handle-bm {
    display: none !important;
  }

  /*.handle-br {*/
  /*  bottom: 2px !important;*/
  /*  right: 2px !important;*/
  /*  display: block !important;*/
  /*  background: url("https://i.paste.pics/7df0e732e2bfdb15bdca924f3345c51e.png") !important;*/
  /*  z-index: 2 !important;*/
  /*}*/

</style>
