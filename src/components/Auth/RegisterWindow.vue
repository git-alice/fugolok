<template lang="pug">
  Window(
    :initOptions="initOptions",
    :window-name="this.$options.name",
    :windowType="'info'",
    :content="{title: 'Welcome to Ugolok', infoTooltip: 'Вы находитесь на странице авторизации, если вы еще не с нами - зарегистрируйтесь.'}"
  )
    template(v-slot:content)
      div.sections
        div.icon__section.col-2
          div
            img(src="data:image/x-icon;base64,AAABAAEAICAQAAEABADoAgAAFgAAACgAAAAgAAAAQAAAAAEABAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdwAAAAAAAAAAAAAAAAAAD3hwAAAAAAAAAAAAAAB3AIB4cAAAAAAAAAAAAACId3AIeHAAAAAAAAAAAAAAj3h493hwAAAAAAAIAAAAAI94cI94cAAAAAAAizMAAAAAeHAAeHAAAAAAgAu4AAAACHhwCHhwAAAACDO7gAAACPd4ePd4cAAAAAi7uAMAAACPeHj3eHAAAAgAu4AwAAAAAHhwj3hwAACDO7gDAAAAAAh4cI94gAAIu7uAMAAAAAj3eHj3f4AACLu4AwAAAAAI93iPd/d4AAu7gDAAAAAAAI94938AAAC7uAMAAAAAAACPj3cAiIiIu4AwAAAAAAAI+PdwiLu7u7gDAAAAAAAAj3j3CLu7u7t7MAAAAAAACPd49wu7t7e3tzAAAAAAAI93+PC7uwsLe3swAAAAAAj3f3j4u7uwsLe3MAAAAAAI93f3iLu7uwsLezAAAAAACPd/cAi7uICwsLcwAAAAAAj3dwj4uwB3CwtzAAAAAAAI938IeLsABwu7cwAAAAAAAI93CICLAIALtzAAAAAAAAAI93AAeIAAuzMAAAAAAAAAAI//CHgHd3MAAAAAAAAAAAAIiAiICIiAAAAAAAAAAAAAAAAIAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+f////D///5gf//8AH//+AB///gAf/H4AH/g/BB/gPgAfwDwAH8A+AB8AfwAeAP4AHAH8ABwD/AAIB/4AAA/+AAAf/AAAP/gAAH/wAAB/4AAAf8AAAH/AAAB/wAAAf8ACAP/AAQD/4ACB//AAA//4AAf//AQf//+c////wf//w==")
        div.inputs__section.col-8
          p Type a user name and password to log on to Ugolok.
          br
          .form-group.d-flex.align-items-center.justify-content-between.focused
            label.mr-3 Nickname:
            input.form-control.w-75(
              id="name"
              type="name"
              class="form-control"
              name="name"
              value
              required
              autofocus
              v-model="form.name"
            )
          br
          .form-group.d-flex.align-items-center.justify-content-between.focused
            label.mr-3 Email:
            input.form-control.w-75(
              id="email"
              type="email"
              class="form-control"
              name="email"
              value
              required
              autofocus
              v-model="form.email"
            )
          br
          .form-group.d-flex.align-items-center.justify-content-between.focused
            label.mr-3 Password:
            input.form-control.w-75(
              id="password"
              type="password"
              class="form-control"
              name="password"
              required
              v-model="form.password"
            )
        div.buttons__section.col-2
          button.btn.btn-sm.btn-primary.border-dark(type='button' @click="submit")
            span.btn-text
              span(v-if='!loading') OK
              span(v-if='loading')
                img(src="https://i.gifer.com/XVo6.gif" style="display: block; margin: auto; width: 25px; height: 25px;")
          br
          button.btn.btn-sm.btn-primary(type='button')
            span.btn-text Cancel
    template(v-slot:status)
      span Login
</template>

<script>
import firebase from "firebase";

import Window from "@/components/Elements/Window/Window";

export default {
  name: 'RegisterWindow',
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      error: null,
      loading: false
    };
  },
  components: { Window },
  props: ['initOptions', 'windowName',],
  methods: {
    submit() {
      firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          });
    }
  },
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
