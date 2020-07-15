<template>
    <div class="draggable">
        <ul>
            <li>1111</li>
            <li>2222</li>
            <li>3333</li>
        </ul>
    </div>
</template>

<script>
    import { Sortable, Plugins } from '@shopify/draggable';


    export default {
        name: "window_2",
    mounted() {

            const sortable = new Sortable(document.querySelectorAll('ul'), {
                draggable: 'li',
                collidables: '.other-list',
                plugins: [Plugins.Collidable]
            });

            sortable.on('collidable:in', () => console.log('collidable:in'));
            sortable.on('collidable:out', () => console.log('collidable:out'));

        }
}
</script>

<style>
</style>