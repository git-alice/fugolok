<template lang="pug">
  div
    div(
      id="div",
      ref="border",
      style="border: 1px dotted white; position: absolute; z-index: 5;",
      v-show="dragging || rolling",
      :class="{ 'window-rolling' : rolling}"
    )
    vue-draggable-resizable.instagram(
      ref="window",
      class="testAnimation",
      v-if="window_open",
      v-show="!dragging && !rolling",
      class-name-handle="my-handle",
      :w="wWidth",
      :h="wHeight",
      :z="4",
      :min-width="300",
      :min-height="200",
      :drag-handle="'.drag-handle'",
      :onDragStart="onDragStart",
      :active="active",
      @dragging="onDrag",
      @resizing="onResize",
      @dragstop="onDragStop",
      @resizestop="onResizingStop",
      @activated="onActivated",
      @deactivated="onDeactivated")
        div(slot="br")
          img(:src="require(\"@/assets/img/resize_icon.png\")")
        .inner
            header.bar.drag-handle(:class="{ 'bar-active' : active}")
                h1 {{ (content.title) ? content.title : ''}}
                .buttons(v-if="windowType=='default'")
                    a.minimize(v-on:click="rollWindow")
                    a.maximize(v-on:click="maximizeWindow")
                    a.close(v-on:click="closeWindow")
                .buttons(v-else-if="windowType=='info'")
                    a.help(v-tooltip="{content: content.infoTooltip, trigger: 'hover'}")
            nav.menu
              br
            //    ul
            //        li
            //            a(href="#" target="_blank") Codepen
            //        li
            //            a(href="#" target="_blank") Scrollbars
            //        li
            //            a(href="#" target="_blank") Inspiration
            .container
                // input#input-home.menu-input(checked="true" name="menu" type="radio")
                // label.menu-label(for="input-home") Home
                // input#input-profile.menu-input(name="menu" type="radio")
                // label.menu-label(for="input-profile") Profile
                .content
                    .content-section.home
                        .feed
                            #home.feed-type
                                // button(@click="testAnime") Play
                                slot
                        div(style="padding: 5px;") :X {{ x }} :Y {{ y }} :Z {{ z }}
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import Button from "@/components/Elements/Buttons/Button";

export default {
  name: "WindowRaw",
  components: {Button},
  props: {
    initWidth: {
      type: Number,
      default: 400
    },
    initHeight: {
      type: Number,
      default: 400
    },
    initX: {
      type: Number,
      default: 100
    },
    initY: {
      type: Number,
      default: 100
    },
    windowType: {
      type: String,
      default: 'default'
    },
    content: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      window_open: true,
      active: false,
      dragging: false,
      rolling: false,
      wWidth: this.initializeWidth(),
      wHeight: this.initializeHeight(),
      x: null,
      y: null,
      z: null,
      maximized: false,
    }
  },
  methods: {
    closeWindow() {
      this.$emit('closeWindow')
    },
    splitWindow(type) {
      let taskbarHeight = 26,
          h = window.innerHeight - taskbarHeight,
          w = window.innerWidth / 2 ,
          x = null,
          y = null;

      if (type === 'left') {
        x = -20; y = -20;
      } else if (type === 'right') {
        x = w - 20; y = -20;
      }

      this.$refs.window.changeWidth(w);
      this.$refs.window.changeHeight(h);
      this.$refs.window.moveVertically(y);
      this.$refs.window.moveHorizontally(x);

      this.$emit('splitWindow', x, y, w, h)
    },
    maximizeWindow() {
      let taskbarHeight = 26,
          h = window.innerHeight - taskbarHeight,
          w = window.innerWidth,
          x = -20,
          y = -20;

      if (this.maximized) {
        let hInit = 370,
            wInit = 570;
        x = (w - wInit) / 2;
        y = (h - hInit) / 2;
        h = hInit; w = wInit;
        this.maximized = !this.maximized;
      } else {
        this.maximized = !this.maximized;
      }

      this.$refs.window.changeWidth(w);
      this.$refs.window.changeHeight(h);
      this.$refs.window.moveVertically(y);
      this.$refs.window.moveHorizontally(x);

      this.$emit('maximizeWindow', x, y, w, h)
    },
    rollWindow() {
      let border = this.$refs.border;
      console.log('rolling')
      console.log(border.style.width)
      this.rolling = true;

      setTimeout(() => {
        border.style.width = 0 + 'px';
        border.style.height = 0 + 'px';
        border.style.left = 0 + 'px';
        border.style.top = window.innerHeight + 'px';
      }, 1); // !
      setTimeout(() => {
        this.rolling = false;
        this.$emit('rollWindow');
      }, 1000);
    },
    onDragStart() {
      this.active = true;
    },
    onDrag(x, y) {
      this.x = x;
      this.y = y;
      this.z = this.$refs.window.zIndex;

      let draggingWindow = this.$refs.window.$el
      let border = this.$refs.border;
      this.dragging = true;
      border.style.left = (x + 20) + 'px';
      border.style.top = (y + 20) + 'px';
      border.style.width = draggingWindow.style.width;
      border.style.height = draggingWindow.style.height;
    },
    onDragStop(x, y) {
      console.log('onDragStop')
      this.dragging = false;
      let border = this.$refs.border;
      // border.style.width = 0;
      // border.style.height = 0;
      this.$emit('onDragStop', x, y)
    },
    onResize(left, top, width, height) {
      let border = this.$refs.border;
      this.dragging = true;
      border.style.width = width + 'px';
      border.style.height = height + 'px';
    },
    onResizingStop(left, top, width, height) {
      this.dragging = false;
      this.$emit('onResizingStop', width, height)
    },
    onActivated() {
      this.$refs.window.zIndex = 5;
      this.active = true;
      this.$emit('onActivated')
    },
    onDeactivated() {
      this.active = false;
      this.$refs.window.zIndex = 4;
    },
    initializeWidth() {
      return this.initWidth ? this.initWidth : 300;
    },
    initializeHeight() {
      return this.initHeight ? this.initHeight : 200;
    },
    testAnime() {
      let testAnime = anime({
        targets: this.$parent.$el,
        keyframes: [
          {scaleX: 0.7, scaleY: 0.7, opacity: 0},
          {scaleX: 0.7, scaleY: 0.7, opacity: 1},
          {scaleX: 0.5, scaleY: 0.5, opacity: 0},
          {scaleX: 0.5, scaleY: 0.5, opacity: 1},
          {scaleX: 0.3, scaleY: 0.3, opacity: 0},
          {scaleX: 0.3, scaleY: 0.3, opacity: 1},
        ],
        opacity: 0,
        duration: 1000,
        // direction: 'alternate',
        easing: 'linear'
      })
      testAnime.restart();
      this.closeWindow()
    }
  },
  mounted() {
    let x = this.initX ? this.initX : 0;
    let y = this.initY ? this.initY : 0;

    this.$refs.window.moveVertically(y);
    this.$refs.window.moveHorizontally(x);

    let border = this.$refs.border;
    border.style.width = this.initializeWidth() + 'px';
    border.style.height = this.initializeHeight() + 'px';
    border.style.left = (x + 20) + 'px';
    border.style.top = (y + 20) + 'px';
  },
  created() {
    console.log('created rawWindow', this.windowType);
  }
}
</script>

<style lang="scss">
@import "src/assets/css/index.scss";

.my-handle {
  position: absolute;
  height: 14px;
  width: 14px;
}

.my-handle-br {
  display: block !important;
  width: 15px;
  height: 15px;
  bottom: 4px;
  right: 4px;
  cursor: se-resize;
  background: url('data:image/png;base64,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') !important;
  z-index: 1;
}
</style>