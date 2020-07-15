<template lang="pug">
    div.taskbar
        Start
        button.task_button(v-for="opened_window in windows" :key="opened_window.id" :id="opened_window.id" v-on:click="close_open") Окно {{ opened_window.id }}
</template>

<script>
    import Start from './Start'
    import TaskButton from './TaskButton'
    export default {
        name: "taskbar",
        data: () => {
            return {
                windows: null
            }
        },
        components: {
            Start, TaskButton
        },
        mounted() {
            let windows = this.$parent.$children.filter((el) => {
                if (el.$children) {
                    return el.$children[0].id
                }
            }).map((el) => {
                return el.$children[0]
            });
            this.windows = windows
        },
        methods: {
            close_open(event) {
                let opened_window = this.windows.filter((el) => {
                    return (el.id === Number(event.target.id))
                })[0]
                opened_window.window_open = !opened_window.window_open
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