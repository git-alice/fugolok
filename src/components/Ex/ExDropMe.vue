<template lang="pug">
    Window(:initWidth="initWidth", :initHeight="initHeight", :initX="initX", :initY="initY")
        DropMeFileForm
</template>

<script>
    import Window from '@/components/Window/Window'
    import DropMeFileForm from '@/components/DropMeFile/Form'

    export default {
        name: 'exWindow',
        props: ['initWidth', 'initHeight', 'initX', 'initY'],
        components: {
            Window, DropMeFileForm
        }
    }
</script>