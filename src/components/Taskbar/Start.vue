<template lang="pug">
  div.d-flex
    v-popover.d-block.m-auto(offset='2' placement='top-end' boundariesElement="body" @apply-show="startIsOpen = true" @apply-hide="startIsOpen = false")
      // This will be the popover target (for the events and position)
      button.start__button.toggle(:class="startIsOpen ? 'active': ''")
        img(src="@/assets/img/start.png")
        div
        b Start
      // This will be the content of the popover
      template(slot='popover')
        div.d-flex.justify-content-between.align-content-center.start__wrapper
          h2 Ugolok <em>95</em>
          div.group.w-100.d-flex.flex-column.justify-content-start
            v-popover(offset='0' classes="start__root__button" openClass='popover__active' boundariesElement="body" trigger="hover" placement='right-start' @apply-show="isOpen = true")
              .item.dropdown.w-100
                i.apps
                span.label Programs
              template(slot='popover')
                .inner.d-flex.flex-column
                  button(v-show="isOpen" @click="isOpen = false") Radio
                  button(v-show="isOpen" @click="isOpen = false") TV
                  button(v-show="isOpen" @click="isOpen = false") Other
            v-popover(offset='0' classes="start__root__button" openClass='popover__active' boundariesElement="body" trigger="hover" placement='right-start' @apply-show="isOpen = true")
              .item.dropdown.w-100
                i.docs
                span.label Documents
              template(slot='popover')
                .inner
                  button(v-show="isOpen" @click="isOpen = false") inside 1
            v-popover(offset='0' classes="start__root__button" openClass='popover__active' boundariesElement="body" trigger="hover" placement='right-start' @apply-show="isOpen = true")
              .item.dropdown.w-100
                i.settings
                span.label Settings
              template(slot='popover')
                .inner
                  button(v-show="isOpen" @click="isOpen = false") inside 1
            hr.w-100
            .item.logout.w-100
              i.logout
              span.label(@click="signOut") Logout

</template>

<script>
export default {
  name: 'Start',
  data() {
    return {
      startIsOpen: false,
      isOpen: false
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('firebase_logout');
    }
  }
}
</script>

<style lang="scss" scoped>

$blue: #00087E;

.inner {
  margin-top: -2px;
  background-color: #0c7c5a;

  button {
    min-width: 130px;
    text-align: left;

    &:hover {
      background: $blue;
      color: whitesmoke;
    }
  }
}

.popover__active {
    background-color: $blue;
    color: white !important;

  .item{
    &::before {
      border-color: transparent white transparent !important;
    }
  }
}
// --------

.start__wrapper {
  background: #c0c0c0;
  min-height: 300px;
  min-width: 164px;
  padding: 2px;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;

  &:before {
    position: absolute;
    content: '';
    left: 2px;
    top: 2px;
    width: 21px;
    height: calc(100% - 2px);
    background: #808080;
    pointer-events: none;
    border-width: 1px 0 1px 1px;
    border-color: #c0c0c0;
    border-style: solid;
    margin: -1px;
    z-index: 2;
  }

  button {
    width: 100%;
  }

  & .item:first-child {
    margin-top: 2px;
  }

  & .item {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 4px 9px 4px 30px;
    text-decoration: none;
    margin: 0 2px;
    position: relative;

    &, & *:hover {
      cursor: pointer;
    }

    &:before {
      content: '';
      border-style: solid;
      border-width: 4px 0 4px 4px;
      border-color: transparent black transparent;
      width: 0;
      height: 0;
      position: absolute;
      right: 7px;
      color: #000;
      z-index: 2;
    }

    &.logout {
      &:hover {
        background: $blue;
        color: whitesmoke;
      }

      &:before {
        border: none;
      }
    }

    & i {
      width: 24px;
      height: 24px;
      position: relative;

      &:before, &:after {
        position: absolute;
        content: '';
        left: 0;
        top: 0;

        &:hover {
          cursor: pointer;
        }
      }

      &.apps:before {
        background: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 18'%3E%3Cpath d='M1 18h19V4.5L18.5 3 0 17z'/%3E%3Cpath d='M.5 3L3 .5h7l2.5 3h6V16H.5z' fill='%23ff3'/%3E%3Cpath d='M1 3v13h1V4h16V3z' fill='white'/%3E%3Cpath d='M2 2L1 3h11l-1-1z' fill='silver'/%3E%3Cpath d='M3 0L0 3v14h19V3.5L17.5 2H12l-2-2zm.5 1h6l2 2H17l1 1v12H1V3.5z' fill='gray'/%3E%3C/svg%3E") no-repeat;
        width: 20px;
        height: 18px;
      }
      &.apps:after {
        top: 5px;
        left: 4px;
        background: url("data:image/svg+xml;charset=utf8,%3Csvg version='1.1' viewBox='0 0 19 17' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='a'%3E%3CfeFlood flood-color='black' flood-opacity='.66' result='flood'/%3E%3CfeComposite in='flood' in2='SourceGraphic' operator='xor'/%3E%3CfeOffset dx='-1' dy='-1' result='offset'/%3E%3CfeComposite in='offset' in2='SourceGraphic' operator='atop'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='m0 0h19v17h-19z' fill='gray' filter='url%28%23a%29'/%3E%3Cpath d='m1 1h17v15h-17z' fill='silver'/%3E%3Cpath d='m2 2h15v2h-15z' fill='navy'/%3E%3Cpath d='m11 2h6v2h-6z'/%3E%3Cpath d='m11 2v1h1v-1zm2 0v1h1v-1zm2 0v1h1v-1zm-13 3v10h15v-10z' fill='white'/%3E%3Cpath d='m13 11h3v-2l-2-2-1 2z' fill='green' filter='url%28%23a%29'/%3E%3Cpath d='m10 9-3 1 1 1 1-1 2 1v-1z' fill='purple'/%3E%3Cpath d='m8 7 3 1-2 3z' fill='blue' filter='url%28%23a%29'/%3E%3Cpath d='m3 8 1 3 2-1v-2l-1-1z' fill='red' filter='url%28%23a%29'/%3E%3Cpath d='m3 12.5h3zm5 0h3zm5 0h3z' stroke='gray' stroke-width='1px'/%3E%3C/svg%3E") no-repeat;
        width: 29px;
        height: 17px;
      }

      &.docs:after {
        background: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3Cfilter id='a' width='1.2' y='-.1' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='1' flood-color='%23FFF' result='flood'/%3E%3CfeComposite in='flood' in2='SourceGraphic' operator='out' result='composite1'/%3E%3CfeOffset dx='1' dy='1' result='offset'/%3E%3CfeComposite in='offset' in2='SourceGraphic' operator='atop' result='fbSourceGraphic'/%3E%3CfeFlood flood-opacity='1' flood-color='%23000' result='flood'/%3E%3CfeComposite in2='fbSourceGraphic' in='flood' operator='out' result='composite1'/%3E%3CfeOffset dx='-2' dy='-1.5' result='offset'/%3E%3CfeComposite in2='fbSourceGraphic' in='offset' operator='atop' result='composite2'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M13 1l-9 9 11 11 9-9z' fill='%23fff' filter='url%28%23a%29'/%3E%3Cpath d='M13 4.5L7.5 10h1l5-5zm1 1L9.5 10h1l4-4zm1 1L11.5 10h1l3-3zm1 1L13.5 10h1l2-2z' fill='%2300f'/%3E%3Cpath d='M5 21l-1-1-3-10V9l1-1h3l7-7h1L6 8h12l1 1z' fill='gray'/%3E%3Cpath d='M2 9l3 12h17l1-1-4-11z' fill='%23ff3' filter='url%28%23a%29'/%3E%3C/svg%3E") no-repeat;
        width: 24px;
        height: 24px;
      }

      &.docs:before {
        background: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cdefs%3E%3Cfilter id='a' width='1.2' y='-.1' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='1' flood-color='%23FFF' result='flood'/%3E%3CfeComposite in='flood' in2='SourceGraphic' operator='out' result='composite1'/%3E%3CfeOffset dx='1' dy='1' result='offset'/%3E%3CfeComposite in='offset' in2='SourceGraphic' operator='atop' result='fbSourceGraphic'/%3E%3CfeFlood flood-opacity='1' flood-color='%23000' result='flood'/%3E%3CfeComposite in2='fbSourceGraphic' in='flood' operator='out' result='composite1'/%3E%3CfeOffset dx='-2' dy='-1.5' result='offset'/%3E%3CfeComposite in2='fbSourceGraphic' in='offset' operator='atop' result='composite2'/%3E%3C/filter%3E%3C/defs%3E%3Cpath d='M13 1l-9 9 11 11 9-9z' fill='%23fff' filter='url%28%23a%29'/%3E%3Cpath d='M13 4.5L7.5 10h1l5-5zm1 1L9.5 10h1l4-4zm1 1L11.5 10h1l3-3zm1 1L13.5 10h1l2-2z' fill='%2300f'/%3E%3Cpath d='M5 21l-1-1-3-10V9l1-1h3l7-7h1L6 8h12l1 1z' fill='gray'/%3E%3Cpath d='M2 9l3 12h17l1-1-4-11z' fill='%23ff3' filter='url%28%23a%29'/%3E%3C/svg%3E") no-repeat;
        width: 20px;
        height: 18px;
      }
      &.settings:before {
        background: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M0 0h17v20H0z' fill='silver'/%3E%3Cpath d='M4 2h8v8H4z' fill='white'/%3E%3Cpath d='M0 0v20h17V0zm.5.5h15v18H.5zM5 3v5.5h1V4h4.5V3z'/%3E%3Cpath d='M4 2v8l1-1h6V3l1-1zm1 1h5.5v5.5H5z' fill='gray'/%3E%3Cpath d='M6 6l1.5 1.5L10 5' fill='none' stroke='black'/%3E%3Cpath d='M4 9v3H2v5.5h2v4L6.5 23H8l3-2v3h4v-3l3 2h2l2-2v-3.5h2V12h-2V9l-2-1h-2l-3 2z'/%3E%3Cpath d='M6 8L4 9v1l2 2H2.5v4H7l-2.5 1.5v3L7 22l2-1.5h3V23h2v-2.5h2l2 1.5h2l1-1v-3l-3-2v-1l3 1.5h2.5V12H20l2-2V9l-2-1h-1l-4 3h-2L8 8z' fill='olive'/%3E%3Cpath d='M7 9l-2 1 2 2v1H3v2h4l1 1-3 2v3l2 1v-2l4-2.5h1v3h2v-3h1l4 2.5 2-2-3-2 1-1h4v-2h-4v-1l2-2-2-1-5 3.2h-2z' fill='%23ffff80'/%3E%3Cpath d='M10.5 7.5h5v8h-5z' fill='silver'/%3E%3Cpath d='M10 16V7.5h6V16h-3.5V7.5H11V16z' fill='gray'/%3E%3Cpath d='M14.5 7.5H16v8h-1.5z'/%3E%3Cellipse cx='13' cy='7.5' rx='2.5' ry='1' fill='white' stroke='gray'/%3E%3Cpath d='M10 13h-.5l-1 .5v1l1.5 1h6l1.5-1v-1l-1-.5H16' fill='none' stroke='olive'/%3E%3C/svg%3E") no-repeat;
        width: 24px;
        height: 24px;
      }
      &.logout:before {
        background: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M24 6v10l-4 3v3l-4 2h-2L0 17V4h21z'/%3E%3Cpath d='M5 0L0 3v13l15 7 4-2V7h1v11l3-2V5l-6-4h-6.5L9 0z' fill='gray'/%3E%3Cpath d='M5.5 1L1 3.5v13L14 23h1V8l4-1L9 1zM12 2l8 5 3-1-6-4z' fill='silver'/%3E%3Cpath d='M3 15V5l10 5v10z' fill='blue'/%3E%3Cpath d='M2 17V4l1-1 12 6 .5-1-12-6L1 3.5v13z' fill='white'/%3E%3Cpath d='M7 9v3l-1-2H4l2 2-2 1 1 1 2-1v2l1 1v-3l2 2 1-1-2-1 2-2-1-1-2 2V9z' fill='aqua'/%3E%3Cpath d='M7 11.5h1V13H7z' fill='%23ff0'/%3E%3Cpath d='M3 5v10l10 5V10zm1 1l8.5 4.5V19L4 15z'/%3E%3C/svg%3E") no-repeat;
        width: 24px;
        height: 24px;
      }
    }
    .label {
      min-width: 91px;
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  & h2 {
    position: absolute;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: 1.5px;
    left: 2px;
    bottom: 6px;
    font-weight: bold;
    padding: 0;
    margin: 0;
    color: #c0c0c0;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    -ms-writing-mode: tb-rl;
    -webkit-writing-mode: vertical-lr;
    writing-mode: vertical-lr;
    pointer-events: none;
    z-index: 2;

    em {
      color: #fff;
      display: inline-block;
      font-weight: normal;
      letter-spacing: 0;
      -webkit-transform: scaleY(1.25) translateY(25%);
      transform: scaleY(1.25) translateY(25%);
    }
  }

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
}
</style>