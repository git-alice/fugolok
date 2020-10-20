<template lang="pug">
  .neon_wrapper
    .text__neon
      | YO<i>U</i> ARE
      | <br> WE<i>L</i><i>C</i><i>O</i></span>ME
</template>

<script>
import neonLoop from '../../utils/neon'

export default {
  name: "Land",
  mounted() {
    let elements = document.querySelectorAll('.text__neon i');
    neonLoop(elements)
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Neon Neue";
  src: url("https://raw.githack.com/hacknug/neon-neue/master/Font%20Files/OpenType%20Webfont/NeonNeue-Regular.otf")
}

body {
  background: #222;
}


.neon_wrapper {
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.73) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  image-rendering: pixelated;
}

.text__neon {
  text-align: left;
  vertical-align: middle;
}

i, .text__neon {
  font: normal 100px/ 100px 'Neon Neue', Helvetica, Arial;
  font-size: 10rem;
  line-height: 1;
  color: rgba(242, 234, 18, 1);
  text-shadow: 0 0 30px rgba(242, 234, 18, 0.5),
  0 0 10px rgba(242, 234, 18, 1),
  0 0 100px rgba(242, 234, 18, 0.5),
  0 0 500px rgba(242, 234, 18, 0.25),
  5px 9px 5px rgba(0, 0, 0, 0.5);
}

i.off {
  color: rgba(46, 46, 46, 0.61);
  text-shadow: 7px 7px 5px rgba(0, 0, 0, 0.5);
}
</style>