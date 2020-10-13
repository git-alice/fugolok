<template lang="pug">
  div
    // Dotted box
    div(
      class="dotted__box"
      ref="dottedBox",
      v-show="dragging || rolling",
      :class="{ 'window-rolling' : rolling}"
    )
    // Directly window
    vue-draggable-resizable.vdr__window(
      ref="window",
      class="testAnimation",
      v-if="isOpen",
      v-show="!dragging && !rolling",
      class-name-handle="my-handle",
      :w="initialWidth",
      :h="initialHeight",
      :z="z",
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
      @deactivated="onDeactivated"
    )
        div(slot="br")
          img(:src="require(\"@/assets/img/resize_icon.png\")")
        .inner
            header.bar.drag-handle(:class="{ 'bar-active' : active}")
                h1 {{ (content.title) ? content.title : windowName}}
                .buttons(v-if="windowType=='default'")
                    a.minimize(v-on:click="rollWindow")
                    a.maximize(v-on:click="maximizeWindow")
                    a.close(v-on:click="closeWindow")
                .buttons(v-else-if="windowType=='info'")
                    a.help(v-tooltip="{content: content.infoTooltip, trigger: 'hover'}")
            nav.menu
              br
            .window__container
                .content
                    .content-section.home
                        .content__body
                            .feed-type
                                slot
                        .content__status
                            .status__type
                              span [X={{ xDisplay }}] [Y={{ yDisplay }}] [Z={{ zDisplay }}]
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
import Button from "@/components/Elements/Button/Button";

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
    windowName: {
      type: String,
      default: ''
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
      // Init values
      initialWidth: this.initializeWidth(),
      initialHeight: this.initializeHeight(),
      isOpen: true,
      active: false, // ?
      dragging: false, // ?
      rolling: false, // ?
      maximized: false, // ?
      z: 4,
      // To display on the window
      xDisplay: null,
      yDisplay: null,
      zDisplay: null,
    }
  },
  methods: {

    // --- Control buttons ---
    /**
     * Roll window by press button.
     */
    rollWindow() {
      let dottedBox = this.$refs.dottedBox;
      console.log('rolling')
      console.log(dottedBox.style.width)
      this.rolling = true;

      setTimeout(() => {
        dottedBox.style.width = 0 + 'px';
        dottedBox.style.height = 0 + 'px';
        dottedBox.style.left = 0 + 'px';
        dottedBox.style.top = window.innerHeight + 'px';
      }, 1); // !
      setTimeout(() => {
        this.rolling = false;
        this.$emit('rollWindow');
      }, 1000);
    },
    /**
     * Close window by press button.
     */
    closeWindow() {
      this.$emit('closeWindow')
    },
    /**
     * Maximize window by press button.
     */
    maximizeWindow() {
      let taskbarHeight = 26, // TODO: Move to config
          h = window.innerHeight - taskbarHeight, w = window.innerWidth,
          x = -20, y = -20;

      if (this.maximized) {
        let hInit = 370, wInit = 570;

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

    // --- Splitting --
    /**
     * Split window
     */
    splitWindow(resizeType) {
      let taskbarHeight = 26, // TODO: Move to config
          h = window.innerHeight - taskbarHeight, w = window.innerWidth / 2,
          x = null, y = null;

      if (resizeType === 'left') { x = -20; y = -20; }
      else if (resizeType === 'right') { x = w - 20; y = -20; }

      this.$refs.window.changeWidth(w);
      this.$refs.window.changeHeight(h);
      this.$refs.window.moveVertically(y);
      this.$refs.window.moveHorizontally(x);

      this.$emit('splitWindow', x, y, w, h)
    },

    // --- Dragging ---
    /**
     * On drag start callback
     */
    onDragStart() {
      this.active = true;
    },
    /**
     * On drag callback
     */
    onDrag(x, y) {
      // Set info coordinates
      this.xDisplay = x;
      this.yDisplay = y;
      this.zDisplay = this.$refs.window.zIndex;

      let draggingWindow = this.$refs.window.$el
      let dottedBox = this.$refs.dottedBox;
      this.dragging = true;
      dottedBox.style.left = (x + 20) + 'px';
      dottedBox.style.top = (y + 20) + 'px';
      dottedBox.style.width = draggingWindow.style.width;
      dottedBox.style.height = draggingWindow.style.height;
    },
    /**
     * On drag stop callback
     */
    onDragStop(x, y) {
      console.log('onDragStop')
      this.dragging = false;
      let dottedBox = this.$refs.dottedBox;
      // dottedBox.style.width = 0;
      // dottedBox.style.height = 0;
      this.$emit('onDragStop', x, y)
    },

    // --- Resizing ---
    /**
     * On resize callback
     */
    onResize(left, top, width, height) {
      let dottedBox = this.$refs.dottedBox;
      this.dragging = true;
      dottedBox.style.width = width + 'px';
      dottedBox.style.height = height + 'px';
    },
    /**
     * On resize stop callback
     */
    onResizingStop(left, top, width, height) {
      this.dragging = false;
      this.$emit('onResizingStop', width, height)
    },

    // --- Activation ---
    /**
     * On activated callback
     */
    onActivated() {
      this.$refs.window.zIndex = 5;
      this.active = true;
      this.$emit('onActivated')
    },
    /**
     * On deactivated callback
     */
    onDeactivated() {
      this.active = false;
      this.$refs.window.zIndex = 4;
    },

    // --- Initialization ---
    /**
     * Initialize width
     */
    initializeWidth() {
      return this.initWidth ? this.initWidth : 300;
    },
    /**
     * Initialize height
     */
    initializeHeight() {
      return this.initHeight ? this.initHeight : 200;
    },
  },
  mounted() {
    // Setting initial position values
    let x = this.initX ? this.initX : 0;
    let y = this.initY ? this.initY : 0;
    this.xDisplay = x; this.yDisplay = y; this.zDisplay = this.z;
    this.$refs.window.moveVertically(y);
    this.$refs.window.moveHorizontally(x);

    // Setting initial size for dotted box
    let dottedBox = this.$refs.dottedBox;
    dottedBox.style.width = this.initializeWidth() + 'px';
    dottedBox.style.height = this.initializeHeight() + 'px';
    dottedBox.style.left = (x + 20) + 'px';
    dottedBox.style.top = (y + 20) + 'px';
  },
  created() {}
}
</script>

<style lang="scss">
@import "../../../assets/css/custom_vue_draggable_resizable";
</style>