<template lang="pug">
    div(
      style="width: 100%; height: 100%"
      ref="layout")
      div(v-for="(child, index) in windows")
        component(:is="child" :key="child.name")
        // button(@click="test") Hide window
        // button(@click="test2") Attach window
        //exWindow
        //exWindow(
        //    :isOpen="isOpen"
        //    v-if="isOpen"
        //    @click="isOpen = !isOpen"
        //    @closeWindow="isOpen = false"
        //)
        //DropMeFileForm(
        //  :initHeight="500",
        //  :initWidth="400",
        //  :initX="100",
        //  :initY="100")
</template>

<script>
    import Vue from 'vue'
    import exWindow from './Ex/ExWindow'
    import Taskbar from './Taskbar/Taskbar'
    import DropMeFileForm from './Ex/ExDropMe'
    import Button from "./Buttons/Button";

    export default {
      name: 'Home',
      data() {
        return {
          isOpen: true,
          openedWindows: [],
          windows: []
        }
      },
      components: {
        Button,
        exWindow, Taskbar, DropMeFileForm
      },
      methods: {
        showWindow() {
          this.isOpen = true
        },
        attachComponent(name, component, props = {}) {
          let componentClass = Vue.extend(component);
          let componentInstance = new componentClass({propsData: props});
          componentInstance.$mount();
          this.$refs.layout.appendChild(componentInstance.$el)
          this.openedWindows.push(componentInstance)
        },
        // attachComponentTest(component) {
        //   this.windows.push(component);
        // },
        // test2() {
        //   this.attachComponentTest(exWindow);
        // },
        // test() {
        //   console.log(this.windows);
        //   this.windows.pop()
        // }
      },
      mounted() {
        let openedWindows = this.$cookies.get('userConfig')['openedWindows'];
        console.log('Opened Windows:')
        console.log(openedWindows);
        for (let windowName in openedWindows) {
          let name = windowName, props = openedWindows[windowName];
          if (name === 'exWindow') {
            this.attachComponent(name, exWindow, props)
            // this.attachComponentTest(exWindow)
          }
          if (name === 'DropMeFileForm') {
            this.attachComponent(name, DropMeFileForm, props)
          }
        }
        // this.$cookies.set(
        //     'userConfig',
        //     {
        //       'openedWindows': {
        //         'exWindow': {'initHeight': 500, 'initWidth': 500, 'initX': 10, 'initY': 10},
        //         // 'DropMeFileForm': {'initHeight': 500, 'initWidth': 500, 'initX': 440, 'initY': 300}
        //         }
        //     });

        // console.log(this.$cookies.get('userConfig'));
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
