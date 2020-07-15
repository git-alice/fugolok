<template>
    <v-stage
            id="stage"
            :config="configKonva"
            @dragstart="handleDragstart"
            @dragend="handleDragend">
        <v-layer ref="layer">
            <v-group
                    ref="group"
                    :config="group"
            >
                <v-rect
                        id="window"
                        ref="window"
                        :config="window"
                >
                </v-rect>
                <v-rect
                        id="window2"
                        :config="window2"
                        v-on:click="close_window"
                >
                </v-rect>
            </v-group>
            <v-group
                    :config="group_begin"
            >
                <v-rect
                        id="window_begin"
                        :config="window_begin"
                        v-on:click="open_window"
                >
                </v-rect>
            </v-group>
        </v-layer>
    </v-stage>
</template>

<script>
    import html2canvas from 'html2canvas'
    import Konva from 'konva'

    const wWidth = window.innerWidth,
        wHeight = window.innerHeight;

    export default {
        data() {
            return {
                window: null,
                window2: null,
                window_begin: null,
                group: {
                    draggable: true,
                    x: 300,
                    y: 300
                },
                group_begin: {
                    x: 0,
                    y: 0
                },
                configKonva: {
                    width: wWidth,
                    height: wHeight
                },
            };
        },
        methods: {
            handleDragstart(e) {
            },
            handleDragend(e) {
            },
            close_window(event) {
                let minH = 70;
                let minW = 140;

                if (!this.$refs.window.getNode().attrs.minimize) {
                    this.$refs.window.getNode().attrs.oldHeight = this.$refs.window.getNode().attrs.height;
                    this.$refs.window.getNode().attrs.oldWidth = this.$refs.window.getNode().attrs.width;

                    this.$refs.window.getNode().attrs.height = minH;
                    this.$refs.window.getNode().attrs.width = minW;

                    this.$refs.window.getNode().attrs.minimize = !this.$refs.window.getNode().attrs.minimize
                } else {
                    this.$refs.window.getNode().attrs.height = this.$refs.window.getNode().attrs.oldHeight;
                    this.$refs.window.getNode().attrs.width = this.$refs.window.getNode().attrs.oldWidth;

                    this.$refs.window.getNode().attrs.minimize = !this.$refs.window.getNode().attrs.minimize
                }

                event.target.parent.getLayer().batchDraw();
                // event.target.parent.draggable(!event.target.parent.draggable());
                // console.log(event.target.draggable())

            },
            open_window(event) {
                console.log('open')

                this.$refs.group.getNode().show()
                // this.$refs.layer.batchDraw();

                console.log(this.$refs.group.getNode().getLayer().batchDraw())
                // this.$refs.group.getNode().draggable(!this.$refs.group.getNode().draggable())

                // console.log(this.$refs.group.getNode())
            }
        },
        mounted() {

            this.window = {
                id: Math.round(Math.random() * 10000).toString(),
                y: 0,
                x: 0,
                width: 500,
                height: 300,
                fill: "#c0c0c0",
                stroke: "#495859",
                strokeWidth: 2,
                zIndex: 0,
                minimize: false
            };

            this.window2 = {
                id: Math.round(Math.random() * 10000).toString(),
                y: 5,
                x: 5,
                width: 30,
                height: 20,
                fill: "#c0c0c0",
                stroke: "#495859",
                strokeWidth: 2,
                zIndex: 1
            };

            this.window_begin = {
                id: Math.round(Math.random() * 10000).toString(),
                y: wHeight - 50,
                x: 0,
                width: wWidth,
                height: 50,
                fill: "#c0c0c0",
                stroke: "#495859",
                strokeWidth: 2,
                zIndex: 0
            }

            let layer = this.$refs.group.getNode().getLayer()

            let shape = new Konva.Image({
                x: 10,
                y: 10,
                draggable: true,
                stroke: 'red',
                scaleX: 1 / window.devicePixelRatio,
                scaleY: 1 / window.devicePixelRatio,
            });
            layer.add(shape);
            layer.draw();



        },
    };
</script>

<style>

</style>