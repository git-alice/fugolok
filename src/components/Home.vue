<template lang="pug">
    div(style="width: 100%; height: 100%")
        Taskbar
        exWindow(
            :isOpen="isOpen"
            v-if="isOpen"
            @click="isOpen = !isOpen"
            @closeWindow="isOpen = false"
        )
        DropMeFileForm(:initHeight="500", :initWidth="400", :initX="100", :initY="100")
</template>

<script>
    import exWindow from './Ex/ExWindow'
    import Taskbar from './Taskbar/Taskbar'
    import DropMeFileForm from './Ex/ExDropMe'

    export default {
      name: 'Home',
        data() {
          return {
              isOpen: true
          }
        },
      components: {
          exWindow, Taskbar, DropMeFileForm
      },
        methods: {
            showWindow() {
                this.isOpen = true
            },

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
