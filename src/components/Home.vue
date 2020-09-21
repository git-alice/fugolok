<template lang="pug">
    div(
      style="width: 100%; height: 100%"
      ref="layout")
      div(v-for="(value, name) in allWindows()" :key="name")
        keep-alive
          component(:is="name" v-if="value.isOpen" :initOptions="value" :ref="name")
            div {{ name }}
            div {{ value }}

      div(v-for="icon in icons")
        Icon(:href-icon="icon.src", :window-name="icon.windowName")


      Taskbar

      notifications(group="info" classes="notification-block")

      ContextMenu(ref="menu")
        template(slot-scope="{ contextData }")
          ContextMenuItem(@click.native="")
            div Action 1 {{ contextData }}
          ContextMenuItem(@click.native="")
            div Action 2 {{ contextData }}

      button(@click="testNoti") Get notification

      Keypress(key-event="keyup" :key-code="39" :modifiers="['ctrlKey']" @success="splitWindow('right')")
      Keypress(key-event="keyup" :key-code="37" :modifiers="['ctrlKey']" @success="splitWindow('left')")
      Keypress(key-event="keyup" :key-code="38" :modifiers="['ctrlKey']" @success="splitWindow('full')")
      Keypress(key-event="keyup" :key-code="40" :modifiers="['ctrlKey']" @success="splitWindow('mini')")

      // button(@contextmenu.prevent="$refs.menu.open($event, 'Payload')") Get contextmenu

</template>

<script>
import Help from "@/components/Windows/Help";
import ExDropMe from './Windows/ExDropMe'
import Account from "@/components/Windows/Account";
import Library from "@/components/Windows/Library";

import Taskbar from './Taskbar/Taskbar'
import Button from "./Buttons/Button";
import Icon from "./Icons/Icon"

import ContextMenu from "@/components/ContextMenu/ContextMenu";
import ContextMenuItem from "@/components/ContextMenu/ContextMenuItem";

export default {
  name: 'Home',
  data() {
    return {
      icons: [
        {'windowName': 'My films', 'src': require("@/assets/img/computer.png")},
        {'windowName': 'ExDropMe', 'src': require("@/assets/img/upload.png")},
        {'windowName': 'Help', 'src': require("@/assets/img/net.png")},
        {'windowName': 'Account', 'src': require("@/assets/img/account.png")},
        {'windowName': 'Library', 'src': require("@/assets/img/folder.png")}
      ],
    }
  },
  components: {
    Library, ExDropMe, Account, Help, Taskbar, Button, Icon, ContextMenu, ContextMenuItem, Keypress: () => import('vue-keypress')
  },
  methods: {
    allWindows() {
      console.log('from allWindows')
      return this.$store.getters.allWindows;
    },
    testNoti() {
      this.$notify({
        group: 'info',
        title: 'Important message',
        text: 'Hello user! This is a notification!',
      });
    },
    splitWindow(type) {
      let window = this.$children.filter(component => component.$options.name === this.$store.getters.activeWindow)[0].$children[0].$children[0]
      if (window.active) {
        if (type === 'full') {
          window.maximizeWindow()
        } else if (type === 'mini') {
          window.rollWindow()
        } else {
          window.splitWindow(type)
        }
      }
    }
  },
  mounted() {
    // this.$store.dispatch('setDefaultConfig', this)
    this.$store.dispatch('loadCookieWindows', this);
  }
}
</script>

<style>

@import "../assets/css/pixel.scss";

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
        src: url("../assets/fonts/MS Sans Serif.ttf");
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

    .notification-block {
      padding: 15px;
      margin: 10px;
    }

</style>
