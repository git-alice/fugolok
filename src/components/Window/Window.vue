<template lang="pug">
    vue-draggable-resizable.instagram(ref="window" v-if="window_open" :w="wWidth" :h="wHeight" :min-width="300" :min-height="200" :drag-handle="'.drag-handle'")
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
@import "./index.scss"
</style>