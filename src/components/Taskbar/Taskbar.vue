<template lang="pug">
    div.taskbar
        Start
        div()
        button.task_button(v-for="(v, k, i) in allWindows()")
          // img(src="@/assets/desktop_icons/account.png")
          p Окно {{ k }}
        button.task_button(@click="closeAllWindows" style="margin-left: auto;") C.A.
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
          // this.windows = this.$store.getters.allWindows;
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
            allWindows() {
              return this.$store.getters.allWindows;
            },
            closeAllWindows(event) {
              this.$store.dispatch('deleteAllWindows', this);
            }
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
        height: 26px;
        background: $g2;
        border: outset 2px;
    }
</style>