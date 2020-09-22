<template lang="pug">
    div(style="width: 100%; height: 100%", ref="layout")
      // --- All Windows ---
      div(v-for="(value, name) in getAllWindows()" :key="name")
        keep-alive
          component(:is="name" v-if="value.isOpen" :initOptions="value" :ref="name")
            div {{ name }}
            div {{ value }}

      // --- All Icons ---
      div(v-for="icon in icons")
        Icon(:href-icon="icon.src", :window-name="icon.windowName")

      // --- Taskbar ---
      Taskbar

      // --- ContextMenu ---
      ContextMenu(ref="menu")
        template(slot-scope="{ contextData }")
          ContextMenuItem(@click.native="")
            div Action 1 {{ contextData }}
          ContextMenuItem(@click.native="")
            div Action 2 {{ contextData }}

      // --- Notfications ---
      notifications(group="info" classes="notification-block")

      // --- KeyResizing ---
      Keypress(key-event="keyup" :key-code="39" :modifiers="['ctrlKey']" @success="splitWindowByKeys('right')")
      Keypress(key-event="keyup" :key-code="37" :modifiers="['ctrlKey']" @success="splitWindowByKeys('left')")
      Keypress(key-event="keyup" :key-code="38" :modifiers="['ctrlKey']" @success="splitWindowByKeys('full')")
      Keypress(key-event="keyup" :key-code="40" :modifiers="['ctrlKey']" @success="splitWindowByKeys('mini')")

      // --- TEST BUTTONS ---
      // button(@contextmenu.prevent="$refs.menu.open($event, 'Payload')") Get contextmenu
      // button(@click="testNotification") Get notification
</template>

<script>
import Help from "@/components/Windows/Help";
import ExDropMe from '../../components/Windows/ExDropMe'
import Account from "@/components/Windows/Account";
import Library from "@/components/Windows/Library";

import Taskbar from '../../components/Taskbar/Taskbar'
import Button from "../../components/Elements/Buttons/Button";
import Icon from "../../components/Elements/Icons/Icon"

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
    /**
     * Returns all open Windows.
     */
    getAllWindows() {
      return this.$store.getters.allWindows;
    },
    /**
     * Split active window by keypress.
     */
    splitWindowByKeys(resizeType) {
      let window = this.$children.filter(component => component.$options.name === this.$store.getters.activeWindow)[0].$children[0].$children[0]
      if (window.active) {
        if (resizeType === 'full') { window.maximizeWindow() }
        else if (resizeType === 'mini') { window.rollWindow() }
        else { window.splitWindow(resizeType) }
      }
    },
    /**
     * TEST NOTIFICATION | TODO: Remove it
     */
    testNotification() {
      this.$notify({
        group: 'info',
        title: 'Important message',
        text: 'Hello user! This is a notification!',
      });
    },
  },
  mounted() {
    // Load windows from cookie
    this.$store.dispatch('loadCookieWindows', this);
  }
}
</script>

<style lang="scss">

@import '~bootstrap-4-grid/css/grid.min.css';

@import "../../assets/css/index.scss";

@import "../../assets/css/buttons.scss";
@import "../../assets/css/input.scss";
@import "../../assets/css/tooltip.scss";
@import "../../assets/css/utils.scss";

@font-face {
  font-family: "PixelFont";
  src: url("../../assets/fonts/MS Sans Serif.ttf");
}

</style>
