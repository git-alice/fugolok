<template lang="pug">
span.task__button__wrapper
  button.task__button(
    @contextmenu.prevent="() => { isMenuOpen = !isMenuOpen; }",
    v-click-outside="() => isMenuOpen = false"
  )
    img(:src="src" height="17px" width="17px")
    span {{ name }}
  button.task__button.task__button_menu(
    @click="closeWindow",
    v-show="isMenuOpen"
  )
    span close
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "TaskButton",
  data: () => {
    return {
      isMenuOpen: false,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: false,
    },
  },
  mounted() {
    this.popupItem = this.$el;
  },
  methods: {
    closeMenu() {
      this.isOpen = false;
    },
    closeWindow() {
      this.$store.dispatch('deleteWindow', {windowName: this.name, vm: this})
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss">
.task__button__wrapper {
  position: relative;
  display: inline-block;

  .task__button {
    padding: unset;
  }

  .task__button_menu {
    width: 100%;
    position: absolute;
    bottom: 26px;
    top: -26px;
    left: 0;
    text-align: center;

    p {
      width: 100%;
    }
  }
}
</style>