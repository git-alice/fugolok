<template lang="pug">
    div.taskbar
      // Start button
      Start(@click="")

      // Left status bar | Opened windows
      span(v-for="(value, key, i) in getAllWindows()" @click="onRollWindow($event, key)" :class="value.isOpen ? 'active': ''")
        TaskButton(:name="key" :src="value.src")

      // Right status bar
      button.task__button(@click="closeAllWindows" style="margin-left: auto;") C.A.
</template>

<script>
import Start from './Start'
import TaskButton from './TaskButton'

export default {
  name: "Taskbar",
  data: () => {
    return {}
  },
  components: {
    Start, TaskButton
  },
  mounted() {
    // console.log(this.windows)
    // this.w indows = this.$store.getters.getAllWindows;
    // console.log(this.windows)
    // let windows = this.$parent.$children.filter((el) => {
    //     if (el.$children) {
    //         return el.$children[0].id
    //     }
    // }).map((el) => {
    //     return el.$children[0]
    // });
    // this.windows = windows
  },
  created() {
    console.log('from Taskbar')
  },
  methods: {
      getAllWindows() {
        return this.$store.getters.allWindows;
      },
      closeAllWindows(event) {
        this.$store.dispatch('deleteAllWindows', this);
      },
      onRollWindow(event, windowName) {
        console.log(this.$store.getters.windowByName(windowName))
        if (this.$store.getters.windowByName(windowName).isOpen) {
          console.log('Закрыл');
          this.$store.dispatch('setCookies', {windowName: windowName, isOpen: false, vm: this})
        } else {
          console.log('Открыл');
          this.$store.dispatch('setCookies', {windowName: windowName, isOpen: true, vm: this})
        }
      },
    }
}
</script>

<style lang="scss">
// default windows 95 colors
$g1: #ddd;
$g2: #C0C0C0;
$g3: #888;
$hi: #00087E;
$wh: white;
$bl: black;
$bg: #149091;

.taskbar {
    display: flex;
    flex-direction: row;
    z-index: 9;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right:0px;
    height: 28px;
    background: $g2;
    border: outset 2px;
  button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    p {
      margin-left: 0.3rem;
    }
  }
}
</style>