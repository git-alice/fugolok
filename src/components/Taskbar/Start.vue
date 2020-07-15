<template lang="pug">
    button.start-button.toggle
        img(src="@/assets/start.png")
        b Start
</template>

<script>
    export default {
    }
</script>
<style lang="scss">
    .start-button {
        top: 1px;
        bottom: 1px;
        font-weight: 500;
        font-size: 14px;
        b {
            padding-left: 3px;
        }
    }

</style>