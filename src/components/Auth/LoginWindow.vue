<template lang="pug">
  Window(
    :initOptions="initOptions"
    :window-name="this.$options.name"
  )
    div.sections
      div.icon__section.col-2
        div
          img(src="data:image/x-icon;base64,AAABAAEAICAQAAEABADoAgAAFgAAACgAAAAgAAAAQAAAAAEABAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdwAAAAAAAAAAAAAAAAAAD3hwAAAAAAAAAAAAAAB3AIB4cAAAAAAAAAAAAACId3AIeHAAAAAAAAAAAAAAj3h493hwAAAAAAAIAAAAAI94cI94cAAAAAAAizMAAAAAeHAAeHAAAAAAgAu4AAAACHhwCHhwAAAACDO7gAAACPd4ePd4cAAAAAi7uAMAAACPeHj3eHAAAAgAu4AwAAAAAHhwj3hwAACDO7gDAAAAAAh4cI94gAAIu7uAMAAAAAj3eHj3f4AACLu4AwAAAAAI93iPd/d4AAu7gDAAAAAAAI94938AAAC7uAMAAAAAAACPj3cAiIiIu4AwAAAAAAAI+PdwiLu7u7gDAAAAAAAAj3j3CLu7u7t7MAAAAAAACPd49wu7t7e3tzAAAAAAAI93+PC7uwsLe3swAAAAAAj3f3j4u7uwsLe3MAAAAAAI93f3iLu7uwsLezAAAAAACPd/cAi7uICwsLcwAAAAAAj3dwj4uwB3CwtzAAAAAAAI938IeLsABwu7cwAAAAAAAI93CICLAIALtzAAAAAAAAAI93AAeIAAuzMAAAAAAAAAAI//CHgHd3MAAAAAAAAAAAAIiAiICIiAAAAAAAAAAAAAAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+f////D///5gf//8AH//+AB///gAf/H4AH/g/BB/gPgAfwDwAH8A+AB8AfwAeAP4AHAH8ABwD/AAIB/4AAA/+AAAf/AAAP/gAAH/wAAB/4AAAf8AAAH/AAAB/wAAAf8ACAP/AAQD/4ACB//AAA//4AAf//AQf//+c////wf//w==")
      div.inputs__section.col-8
        p Type a user name and password to log on to Ugolok.
        br
        .form-group.d-flex.align-items-center.justify-content-between.focused
          label.mr-3 User name:
          input.form-control.w-75(type='text')
        br
        .form-group.d-flex.align-items-center.justify-content-between.focused
          label.mr-3 Password:
          input.form-control.w-75(type='text')
      div.buttons__section.col-2
        button.btn.btn-sm.btn-primary.border-dark(type='button')
          span.btn-text OK
        br
        button.btn.btn-sm.btn-primary(type='button')
          span.btn-text Cancel
</template>

<script>
import Window from "@/components/Window/Window";

export default {
  name: 'LoginWindow',
  props: ['initOptions', 'windowName',],
  methods: {},
  components: { Window },
  mounted() {
    console.log('initOptions', this.initOptions)
    console.log('windowName', this.windowName)
    console.log('test', this.test)
    console.log('windowName', this)
  }
}
</script>

<style lang="scss">

.sections {
  display: flex;
  flex-direction: row;
}

.icon__section {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
