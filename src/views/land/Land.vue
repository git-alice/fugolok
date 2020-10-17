<template lang="pug">
  .neon_wrapper
    .text__neon YOU ARE
      | <br> WE<span class="neon_on_off">LCO</span>ME
</template>

<script>
import neon_loop from '../../utils/neon'

export default {
  name: "Land",
  mounted() {
    // neon_loop()
    console.log(document.getElementsByClassName('neon_on_off')[0])
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Neon Neue";
  src: url("https://raw.githack.com/hacknug/neon-neue/master/Font%20Files/OpenType%20Webfont/NeonNeue-Regular.otf")
}

html, body {
  margin: 0;
  height: 100%;
  width: 100%;
  display: table;
}

html {
  background-repeat: repeat;
  background-position: center center;
  background-color:#222;
}

body {
  background: -moz-radial-gradient(center, ellipse cover, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.73) 100%);
  background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(0,0,0,0.04)), color-stop(100%,rgba(0,0,0,0.73)));
  background: -webkit-radial-gradient(center, ellipse cover, rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.73) 100%);
  background: -o-radial-gradient(center, ellipse cover, rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.73) 100%);
  background: -ms-radial-gradient(center, ellipse cover, rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.73) 100%);
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.73) 100%);
}


.neon_wrapper {
  width: 100%;
  height: 100%;
  padding: 2rem;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.04) 0%,rgba(0,0,0,0.73) 100%);
}

.text__neon {
  display: table-cell;
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