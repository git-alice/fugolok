<template lang="pug">
    button.start__button.toggle
        img(src="@/assets/img/start.png")
        div
          b Start
</template>

<script>
export default {
}
</script>
<style lang="scss">
.start__button {
  margin: 1px 4px 1px 1px;
  top: 1px;
  bottom: 1px;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 0.6px;

  div {
    margin-top: 2px;
  }
  b {
    padding-left: 3px;
  }
}
</style>