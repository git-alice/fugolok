<template lang="pug">
  div
    Window(
      :initWidth="initWidth",
      :initHeight="initHeight",
      :initX="initX",
      :initY="initY",
      @onDragStop="onDragWindowStop",
      @onResizingStop="onWindowResizingStop"
    )
        h1 My heading
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa debitis dignissimos eligendi iusto laudantium, minus nisi officiis praesentium quas. Consequatur, eaque fugiat magnam maxime perspiciatis quia quo reiciendis repellat! Sint?
        input
        img(src="https://alexbsoft.github.io/win95.css/assets/confused_travolta.gif")
</template>

<script>
import Window from '@/components/Window/Window'

export default {
    name: 'exWindow',
    props: ['initWidth', 'initHeight', 'initX', 'initY'],
    mounted() {
      console.log(this.initWidth);
    },
    methods: {
      setCookies(options) {
        let windowName = this.$options.name;
        let last_config = this.$cookies.get('userConfig').openedWindows[windowName];
        let x = options.x || last_config.initX,
            y = options.y || last_config.initY,
            w = options.w || last_config.initWidth,
            h = options.h || last_config.initHeight
        let new_window_config = Object.assign(last_config, {initX: x, initY: y, initHeight: h, initWidth: w});
        let new_config = {...this.$cookies.get('userConfig').openedWindows, [windowName]: new_window_config};
        console.log(new_config);
        this.$cookies.set('userConfig', {openedWindows: new_config});
      },
      onWindowResizingStop(w, h) {
        this.setCookies({w: w, h: h});
      },
      onDragWindowStop(x, y) {
        this.setCookies({x: x, y: y});
      }
    },
    components: {
        Window
      }
}
</script>

<style scoped>

</style>