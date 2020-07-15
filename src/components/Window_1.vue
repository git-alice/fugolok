<template>
    <div>
        <vue-draggable-resizable :w="300" :h="200" @dragging="onDrag" @resizing="onResize" id="window" class-name-handle="my-handle-class" class="window">
            <div class="menu-bar"></div>
            <div class="box"></div>
            <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
                X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
        </vue-draggable-resizable>
    </div>

</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
    data: function () {
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    },
    methods: {
        onResize: function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height
        },
        onDrag: function (x, y) {
            this.x = x;
            this.y = y;
        }
    },
    components: {
        VueDraggableResizable
    }
}
</script>

<style lang="scss">
    $h: 100px;
    $w: 100px;
    $g1: lighten(#C5C1C6, 10%);
    $g2: lighten(#C5C1C6, 2%);
    $g3: darken(#C5C1C6, 15%);
    $hi: #F5C8BF;
    $wh: white;
    $bl: darken(#C5C1C6, 50%);
    $bg: #E0D2C5;

    .my-handle-class {
        position: absolute;
        background-color: pink;
        border: 1px solid black;
        border-radius: 50%;
        height: 14px;
        width: 14px;
        box-model: border-box;
        -webkit-transition: all 300ms linear;
        -ms-transition: all 300ms linear;
        transition: all 300ms linear;
    }

    .my-handle-class-tl {
        top: -14px;
        left: -14px;
        cursor: pointer;
    }

    .my-handle-class-tm {
        top: -14px;
        left: 50%;
        margin-left: -7px;
        cursor: n-resize;
    }

    .my-handle-class-tr {
        top: -14px;
        right: -14px;
        cursor: ne-resize;
    }

    .my-handle-class-ml {
        top: 50%;
        margin-top: -7px;
        left: -14px;
        cursor: w-resize;
    }

    .my-handle-class-mr {
        top: 50%;
        margin-top: -7px;
        right: -14px;
        cursor: e-resize;
    }

    .my-handle-class-bl {
        bottom: -14px;
        left: -14px;
        cursor: sw-resize;
    }

    .my-handle-class-bm {
        bottom: -14px;
        left: 50%;
        margin-left: -7px;
        cursor: s-resize;
    }

    .my-handle-class-br {
        bottom: -14px;
        right: -14px;
        cursor: se-resize;
    }

    .my-handle-class-tl:hover,
    .my-handle-class-tr:hover,
    .my-handle-class-bl:hover,
    .my-handle-class-br:hover {
        background-color: red;
        transform: scale(1.4);
    }
</style>