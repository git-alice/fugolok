<template lang="pug">
    div(style="width: 100%; height: 100%", ref="layout")
      // --- All Windows ---
      div.w-100.h-100.position-absolute(v-for="(value, name) in getAllWindows()" :key="name")
        keep-alive
          component(:is="name" v-if="value.isOpen" :initOptions="value" :ref="name")
            // div {{ name }}
            // div {{ value }}

      // --- All Icons ---
      div(v-for="(icon, index) in icons")
        component(:is="icon.component" :data-v-step="index" :window-name="icon.window.name" :src="icon.src" :x="icon.x" :y="icon.y") // :window-name="icon.window.$options.name"

      // --- Taskbar ---
      Taskbar

      // --- ContextMenu ---
      ContextMenu(ref="menu")
        template(slot-scope="{ contextData }")
          ContextMenuItem(@click.native="")
            div Action 1 {{ contextData }}
          ContextMenuItem(@click.native="")
            div Action 2 {{ contextData }}

      // --- KeyResizing ---
      Keypress(key-event="keyup" :key-code="39" :modifiers="['ctrlKey']" @success="splitWindowByKeys('right')")
      Keypress(key-event="keyup" :key-code="37" :modifiers="['ctrlKey']" @success="splitWindowByKeys('left')")
      Keypress(key-event="keyup" :key-code="38" :modifiers="['ctrlKey']" @success="splitWindowByKeys('full')")
      Keypress(key-event="keyup" :key-code="40" :modifiers="['ctrlKey']" @success="splitWindowByKeys('mini')")

      // --- TEST BUTTONS ---
      // button(@contextmenu.prevent="$refs.menu.open($event, 'Payload')") Get contextmenu
      // button(@click="testNotification") Get notification

      v-tour(name="myTour" :steps="steps")
        template(slot-scope='tour')
          transition(name='fade')
            v-step.v-customstep(v-for='(step, index) of tour.steps' :key='index' v-if='tour.currentStep === index' :step='step' :previous-step='tour.previousStep' :next-step='tour.nextStep' :stop='tour.stop' :skip='tour.skip' :is-first='tour.isFirst' :is-last='tour.isLast' :labels='tour.labels')
              div(slot='content')
                .v-customstep__content
                  div.v-step__content(v-if='step.content' v-html='step.content')
                  div(v-else='')
                    | This is a demo step! The id of this step is {{ hash }} and it targets {{ step.target }}.
              template(v-if="tour.currentStep === 0")
                div(slot='actions')
                  button(@click='tour.finish') Finish
                  button(@click='tour.nextStep') Next step
              template(v-else-if="tour.currentStep === tour.steps.length - 1")
                div(slot='actions')
                  button(@click='tour.previousStep') Previous step
                  button(@click='tour.finish') Finish
              template(v-else)
                div(slot='actions')
                  button(@click='tour.finish') Finish
                  button(@click='tour.previousStep') Previous step
                  button(@click='tour.nextStep') Next step


</template>

<script>
import Help from "@/components/Windows/Help";
import SimpleFilm from '../../components/Windows/SimpleFilm'
import Account from "@/components/Windows/Account";
import Library from "@/components/Windows/Library";
import DragAndDropFilm from "@/components/Windows/DragAndDropFilm";
import Radio from "@/components/Windows/Radio";

import Taskbar from '../../components/Taskbar/Taskbar'
import Button from "../../components/Elements/Button/Button";
import Icon from "../../components/Elements/Icon/Icon"

import ContextMenu from "@/components/Elements/ContextMenu/ContextMenu";
import ContextMenuItem from "@/components/Elements/ContextMenu/ContextMenuItem";

import icons from "@/business_logic/icons";

export default {
  name: 'Home',
  data: () => {
    return {
      icons: icons,
      steps: [
        {
          target: '[data-v-step="1"] img',  // We're using document.querySelector() under the hood
          header: {
            title: 'Get Started',
          },
          content: `Discover <strong>Vue Tour</strong>!`,
          params: {
            placement: 'left'
          }
        },
        {
          target: '[data-v-step="2"] img',
          content: 'An awesome plugin made with Vue.js!',
          params: {
            placement: 'left'
          }
        },
        {
          target: '[data-v-step="3"] img',
          content: 'Try it, you\'ll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.',
          params: {
            placement: 'top' // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
          }
        }
      ]
    }
  },
  components: {
    Library, SimpleFilm, DragAndDropFilm, Account, Help, Radio,
    Taskbar, Button, Icon, ContextMenu, ContextMenuItem, Keypress: () => import('vue-keypress')
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
        speed: 0
      });
    },
  },
  mounted() {
    console.log(this.$options.components)

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
@import "../../assets/css/custom_notification.scss";
@import "../../assets/css/custom_tour.scss";
@import "../../assets/css/keyboard_shortcut.scss";

@font-face {
  font-family: "PixelFont";
  src: url("../../assets/fonts/MS Sans Serif.ttf");
}

</style>
