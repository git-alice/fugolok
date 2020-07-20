<template lang="pug">
    vue-draggable-resizable.instagram(
      ref="window",
      v-if="window_open",
      :w="wWidth",
      :h="wHeight",
      :z="4",
      :min-width="300",
      :min-height="200",
      :drag-handle="'.drag-handle'",
      @dragging="onDrag",
      @dragstop="onDragStop",
      @resizestop="onResizingStop",
      @activated="onActivated",
      @deactivated="onDeactivated")
        .inner
            header.bar.drag-handle
                h1
                .buttons
                    a.minimize(v-on:click="rollWindow")
                    a.maximize(v-on:click="defaultWindow")
                    a.close(v-on:click="closeWindow")
            nav.menu
                ul
                    li
                        a(href="#" target="_blank") Codepen
                    li
                        a(href="#" target="_blank") Scrollbars
                    li
                        a(href="#" target="_blank") Inspiration
            .container
                input#input-home.menu-input(checked="true" name="menu" type="radio")
                label.menu-label(for="input-home") Home
                input#input-profile.menu-input(name="menu" type="radio")
                label.menu-label(for="input-profile") Profile
                .content
                    .content-section.home
                        .feed
                            #home.feed-type
                                div :X {{ x }} :Y {{ y }} :Z {{ z }}
                                slot
</template>


<script>
    function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    export default {
        name: "Window",
        props: ['initWidth', 'initHeight', 'initX', 'initY'],
        data() {
          return {
            id: randomInteger(1, 100),
            window_open: true,
            wWidth: this.initWidth ? this.initWidth : 300,
            wHeight: this.initHeight ? this.initHeight : 200,
            x: null,
            y: null,
            z: null,
          }
        },
        methods: {
          closeWindow() {
              this.$emit('closeWindow', 'kek')
          },
          defaultWindow() {
              this.$refs.window.changeWidth(500);
              this.$refs.window.changeHeight(500);
          },
          rollWindow() {
              this.$refs.window.changeWidth(200);
              this.$refs.window.changeHeight(300);
          },
          onDrag(x, y) {
            this.x = x;
            this.y = y;
            this.z = this.$refs.window.zIndex;
          },
          onDragStop(x, y) {
            this.$emit('onDragStop', x, y)
          },
          onResizingStop(left, top, width, height) {
            this.$emit('onResizingStop', width, height)
          },
          onActivated() {
            this.$refs.window.zIndex = 5;
          },
          onDeactivated() {
            this.$refs.window.zIndex = 4;
          }
        },
        mounted() {
            let x = this.initX ? this.initX : 0;
            let y = this.initY ? this.initY : 0;

            this.$refs.window.moveVertically(y);
            this.$refs.window.moveHorizontally(x);
        }
    }
</script>

<style lang="scss">
@import "./index.scss";
</style>